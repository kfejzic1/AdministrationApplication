﻿using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using AutoMapper;
using Facebook;
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

        public async Task<bool> DeleteUserAsync(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var result = await _userManager.DeleteAsync(user);
            return result.Succeeded;
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
                Token = new JwtSecurityTokenHandler().WriteToken(token),
                UserId = user.Id
            };
        }

        public async Task<AuthenticationResult> FacebookSocialLogin(string token)
        {
            try
            {
                var facebookClient = new FacebookClient(token);

                dynamic facebookAccessTokenData = await facebookClient.GetTaskAsync("me", new { fields = "name,email,last_name" });

                User user = GetUserByEmail(facebookAccessTokenData.email);

                if (user is null)
                {
                    return new AuthenticationResult
                    {
                        Errors = new[] { "User not found!" }
                    };
                }
                else
                {
                    if (!user.EmailConfirmed)
                        return new AuthenticationResult
                        {
                            Errors = new[] { "User didn't verify email!" }
                        };

                    if (user.TwoFactorEnabled && user.AuthenticatorKey != null)
                        return new AuthenticationResult
                        {
                            TwoFactorEnabled = true,
                            Mail = user.Email
                        };

                    var authClaims = await TokenUtilities.GetAuthClaimsAsync(user, _userManager);

                    var jwtToken = TokenUtilities.CreateToken(authClaims, _configuration);

                    return new AuthenticationResult
                    {
                        Success = true,
                        Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                        UserId = user.Id
                    };
                }
            }
            catch
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Invalid token!" }
                };
            }
        }


        public async Task<AuthenticationResult> GoogleSocialLogin(string token)
        {
            using (HttpClient httpClient = new HttpClient())
            {
                try
                {
                    GoogleAccessTokenData googleAccessTokenData = await httpClient.GetFromJsonAsync<GoogleAccessTokenData>("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token);

                    var user = GetUserByEmail(googleAccessTokenData.Email);

                    if (user is null)
                    {
                        return new AuthenticationResult
                        {
                            Errors = new[] { "User not found!" }
                        };
                    }
                    else
                    {
                        if (!user.EmailConfirmed)
                            return new AuthenticationResult
                            {
                                Errors = new[] { "User didn't verify email!" }
                            };

                        if (user.TwoFactorEnabled && user.AuthenticatorKey != null)
                            return new AuthenticationResult
                            {
                                TwoFactorEnabled = true,
                                Mail = user.Email
                            };

                        var authClaims = await TokenUtilities.GetAuthClaimsAsync(user, _userManager);

                        var jwtToken = TokenUtilities.CreateToken(authClaims, _configuration);

                        return new AuthenticationResult
                        {
                            Success = true,
                            Token = new JwtSecurityTokenHandler().WriteToken(jwtToken),
                            UserId = user.Id
                        };
                    }
                }
                catch
                {
                    return new AuthenticationResult
                    {
                        Errors = new[] { "Invalid token!" }
                    };
                }
            }
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
    }
}
