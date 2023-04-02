using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using Google.Authenticator;
using Microsoft.AspNetCore.Identity;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace AdministrationAPI.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public UserService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        public async Task<UserDT> GetUser(string id)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                throw new DataException("User with the provided id does not exist!");
            }

            return new UserDT
            {
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Phone = user.PhoneNumber,
                IsTwoFactorEnabled = user.TwoFactorEnabled,
                AuthenticatorKey = user.AuthenticatorKey
            };
        }

        public List<User> GetAllUsers()
        {
            var users = _userManager.Users.ToList();
            return users;
        }

        public User GetUserByName(string name)
        {
            return _userManager.Users.FirstOrDefault(x => x.UserName == name);
        }

        public async Task<AuthenticationResult> Login(LoginRequest loginRequest)
        {
            User user = new User();

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

            if (user.TwoFactorEnabled && user.AuthenticatorKey != null)
                return new AuthenticationResult
                {
                    TwoFactorEnabled = true,
                    Mail = user.Email
                };

            var authClaims = await TokenUtilities.GetAuthClaimsAsync(user, _userManager);

            var token = TokenUtilities.CreateToken(authClaims, _configuration);

            return new AuthenticationResult
            {
                Success = true,
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                UserId = user.Id
            };
        }

        public async Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null)
                return new AuthenticationResult
                {
                    Errors = new[] { "Invalid user!" }
                };

            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            string key = Encoding.UTF8.GetString(Convert.FromBase64String(user.AuthenticatorKey));
            bool result = tfa.ValidateTwoFactorPIN(key, loginRequest.Code);

            if (result)
            {
                var authClaims = await TokenUtilities.GetAuthClaimsAsync(user, _userManager);
                var token = TokenUtilities.CreateToken(authClaims, _configuration);

                return new AuthenticationResult
                {
                    Success = true,
                    Token = new JwtSecurityTokenHandler().WriteToken(token),
                    UserId = user.Id
                };
            }

            return new AuthenticationResult
            {
                Errors = new[] { "Invalid code!" }
            };
        }

        public async Task<QRCodeResponse> GetTwoFactorQRCode(string id)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                throw new DataException("User with the provided id does not exist!");

            string key = Guid.NewGuid().ToString().Replace("-", "").Substring(0, 10);
            string encodedKey = Convert.ToBase64String(Encoding.UTF8.GetBytes(key)); ;

            TwoFactorAuthenticator tfa = new TwoFactorAuthenticator();
            SetupCode setupInfo = tfa.GenerateSetupCode("Administration App", user.Email, key, false);
            string qrCodeUrl = setupInfo.QrCodeSetupImageUrl;
            string manualEntryCode = setupInfo.ManualEntryKey;

            user.AuthenticatorKey = encodedKey;
            await _userManager.UpdateAsync(user);

            return new QRCodeResponse
            {
                Url = qrCodeUrl,
                ManualString = manualEntryCode
            };
        }

        public async Task<bool> Toggle2FA(string id)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                throw new DataException("User with the provided id does not exist!");

            if (user.TwoFactorEnabled)
                user.AuthenticatorKey = null;

            user.TwoFactorEnabled = !user.TwoFactorEnabled;

            var result = await _userManager.UpdateAsync(user);

            return user.TwoFactorEnabled;
        }
    }
}
