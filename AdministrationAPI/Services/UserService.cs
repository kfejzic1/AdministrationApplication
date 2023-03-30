using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AdministrationAPI.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;

        public UserService(
            UserManager<IdentityUser> userManager,
            SignInManager<IdentityUser> signInManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        public async Task<AuthenticationResult> Login(LoginRequest loginRequest)
        {
            //Fetch User From Database by email or phone from LoginRequest, password should be hashed
            IdentityUser user = new IdentityUser();

            if (loginRequest.Email != null)
                user = await _userManager.FindByEmailAsync(loginRequest.Email);
            else
                user = _userManager.Users.FirstOrDefault(u => u.PhoneNumber == loginRequest.Phone);

            if (user == null)
                return new AuthenticationResult
                {
                    Errors = new[] { "User not found!" }
                };



            if (!await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Email/Phone/Password combination mismatch!" }
                };
            }

            if (user.TwoFactorEnabled)
            {
                await _signInManager.SignOutAsync();
                var canI = await _signInManager.CanSignInAsync(user);

                await _signInManager.PasswordSignInAsync(user, loginRequest.Password, false, true);
                var twoFactorToken = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultEmailProvider);

                var message = new Message(new string[] { user.Email! }, "Login Confirmation", twoFactorToken);

                return new AuthenticationResult
                {
                    IsTwoFactorEnabled = true,
                    EmailMessage = message
                };
            }

            var authClaims = await GetAuthClaimsAsync(user);

            var token = CreateToken(authClaims);

            return new AuthenticationResult
            {
                Success = true,
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }
       
        public List<IdentityUser> GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return users;
        }

        public List<IdentityUser> GetAssignedUsersForVendor(int vendorId)
        {
            using (var context = new VendorDbContext())
            {
                var userIds = context.VendorUsers.Where(v => v.VendorId == vendorId).Select(u => u.UserId).ToList();
                var users = _userManager.Users.Where(user => userIds.Contains(user.Id)).ToList();
                return users;
            }
            
        }

        public IdentityUser GetUserByName(string name)
        {
            return _userManager.Users.FirstOrDefault(x => x.UserName == name);
        }


        public async Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);
            var signIn = await _signInManager.TwoFactorSignInAsync(TokenOptions.DefaultEmailProvider, loginRequest.Code, false, false);

            if (user == null)
                return new AuthenticationResult
                {
                    Errors = new[] { "Invalid user!" }
                };

            if (signIn.Succeeded)
            {
                var authClaims = await GetAuthClaimsAsync(user);
                var token = CreateToken(authClaims);

                return new AuthenticationResult
                {
                    Success = true,
                    Token = new JwtSecurityTokenHandler().WriteToken(token)
                };
            }

            return new AuthenticationResult
            {
                Errors = new[] { "Invalid code!" }
            };
        }


        private JwtSecurityToken CreateToken(List<Claim> authClaims)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Token:Secret"]));

            var token = new JwtSecurityToken(
                issuer: _configuration["Token:ValidIssuer"],
                audience: _configuration["Token:ValidAudience"],
                expires: DateTime.Now.AddMinutes(30),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            return token;
        }

        private async Task<List<Claim>> GetAuthClaimsAsync(IdentityUser user)
        {
            var authClaims = new List<Claim>
                {
                    new Claim("Name", user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            var userRoles = await _userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            return authClaims;
        }
    }
}
