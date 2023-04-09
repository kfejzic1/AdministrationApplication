using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Helpers;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using AutoMapper;
using Google.Authenticator;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Text;

namespace AdministrationAPI.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;

        public UserService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper
            
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
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

            if ((loginRequest.Email != null && !user.EmailConfirmed) || (loginRequest.Phone != null && !user.PhoneNumberConfirmed))
                return new AuthenticationResult
                {
                    Errors = new[] { "Provided email/phone is not confirmed!" }
                };

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
                Token = new JwtSecurityTokenHandler().WriteToken(token)
            };
        }

        public List<User> GetAssignedUsersForVendor(int vendorId)
        {
            using (var context = new VendorDbContext())
            {
                var userIds = context.VendorUsers.Where(v => v.VendorId == vendorId).Select(u => u.UserId).ToList();
                var users = _userManager.Users.Where(user => userIds.Contains(user.Id)).ToList();
                return users;
            }

        }

        public async Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest)
        {
            User user = new User();

            if (loginRequest.Email != null)
                user = await _userManager.FindByEmailAsync(loginRequest.Email);
            else
                user = _userManager.Users.FirstOrDefault(u => u.PhoneNumber == loginRequest.Phone);

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
                    Token = new JwtSecurityTokenHandler().WriteToken(token)
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

        public User GetUserByEmail(string email)
        {
            return _userManager.Users.FirstOrDefault(u => u.Email == email);
        }

        public User GetUserById(string id)
        {
            return _userManager.Users.FirstOrDefault(u => u.Id == id);
        }

        public User GetUserByFirstName(string firstName)
        {
            return _userManager.Users.FirstOrDefault(u => u.FirstName == firstName);
        }

        public async Task<User> Register(RegisterRequest model)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Email == model.Email || u.UserName == model.Username || u.PhoneNumber == model.PhoneNumber);

            if (user is not null)
            {
                throw new InvalidDataException("User already exists");
            }

            User newUser = _mapper.Map<User>(model);
            IdentityResult result = await _userManager.CreateAsync(newUser, model.Password);
            // _userManager.SaveChanges();

            return result.Succeeded ? newUser : null;
        }

        public async Task<IdentityResult> CreateUser(CreateRequest request)
        {
            User newUser = _mapper.Map<User>(request);
            var usernameTemplate = $"{request.FirstName.First()}{request.LastName}";
            int number = 1;
            while(true)
            {
                string newUsername = $"{usernameTemplate}{number}";
                if (_userManager.Users.FirstOrDefault(u => u.UserName == newUsername) == null)
                {
                    newUser.UserName= newUsername;
                    break;
                }
                number++;
            }

                
            return await _userManager.CreateAsync(newUser);
        }

        public async void SendConfirmationEmail(string email)
        {
            var user = GetUserByEmail(email);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            EmailSender emailSender = new EmailSender();
            await emailSender.SendConfirmationEmailAsync(email, token);
        }

        public async Task<IdentityResult> SetPassword(SetPasswordRequest request)
        {
            var user = GetUserById(request.Id);
            var result = await _userManager.ConfirmEmailAsync(user, request.Token);
            if (result.Succeeded)
            {
               var passwordSet = await _userManager.AddPasswordAsync(user, request.Password);
                return passwordSet;
            }

            return result;
        }

        public async Task<IdentityResult> EditUser(EditRequest request)
        {
            
            var user = GetUserById(request.Id);
            user = _mapper.Map<User>(user);

            return await _userManager.UpdateAsync(user);
        }

        public async void SendPasswordResetEmail(string email)
        {
            var user = GetUserByEmail(email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            EmailSender emailSender = new EmailSender();
            await emailSender.SendPasswordResetEmailAsync(email, token);
        }

        public async Task<IdentityResult> ResetPasswordAsync(SetPasswordRequest request)
        {
            var user = GetUserById(request.Id);
            var result = await _userManager.ResetPasswordAsync(user,request.Token,request.Password);
            return result;
        }

    }
}
