using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Services.Interfaces;
using Google.Authenticator;
using Microsoft.AspNetCore.Identity;
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
        private List<string> listOfCodes = new List<string>() { "042889", "080327", "728991", "311480", "661868", "877397", "447642", "078630", "075330", "441271" };

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

                //Save this key to database, user should have {Id, email, Key}
                //Also try to hash it or sthl
                string key = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10);

                TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
                SetupCode setupInfo = tfa.GenerateSetupCode("Test Two Factor", user.Email, key, false);

                string qrCodeImageUrl = setupInfo.QrCodeSetupImageUrl;
                string manualEntrySetupCode = setupInfo.ManualEntryKey;

                //Vracamo qrCodeImageUrl i proslijedimo ga na frontu kao img url
                //Isto radimo sa manuelEntrySetupCode jer njega rucno unosimo

                return new AuthenticationResult
                {
                    IsTwoFactorEnabled = true,
                    QrCodeImageUrl = qrCodeImageUrl,
                    ManualEntrySetupCode = manualEntrySetupCode,
                    SecKey = key
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

        public async Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);
            //Potrebno dobiti user key sa baze spremiti u varijablu userKey
            string userKey = "0f5465625c";

            if (user == null)
                return new AuthenticationResult
                {
                    Errors = new[] { "Invalid user!" }
                };

            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            bool result = tfa.ValidateTwoFactorPIN(userKey, loginRequest.Code);

            if (result)
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
                    new Claim(ClaimTypes.Name, user.UserName),
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
