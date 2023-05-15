using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Extensions;
using AdministrationAPI.Helpers;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using AutoMapper;
using Facebook;
using Google.Authenticator;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;

namespace AdministrationAPI.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _context;
        private readonly IVendorService _vendorService;
        private readonly IHttpContextAccessor _httpContext;

        public UserService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper,
            RoleManager<IdentityRole> roleManager,
            AppDbContext context
,
            IVendorService vendorService,
            IHttpContextAccessor httpContext)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
            _roleManager = roleManager;
            _context = context;
            _vendorService = vendorService;
            _httpContext = httpContext;
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
                AuthenticatorKey = user.AuthenticatorKey,
                IsEmailValidated = user.EmailConfirmed,
                IsPhoneValidated = user.PhoneNumberConfirmed,
                Type = user.Type
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

        public List<User> GetAllUsersByAdmin()
        {
            var isAdmin = IsLoggedInUserAdmin().Result;
            if (isAdmin == false)
            {
                throw new Exception("User is not authorized to edit.");
            }
            var users = _userManager.Users.ToList();
            return users;
        }

        public User GetUserByName(string name)
        {
            return _userManager.Users.FirstOrDefault(x => x.UserName == name);
        }
        public async Task<User> GetUserByEmailPhone(string email, string phone)
        {
            User user = new User();

            if (email != null)
                user = await _userManager.FindByEmailAsync(email);
            else
                user = _userManager.Users.FirstOrDefault(u => u.PhoneNumber == phone);

            return user;
        }

        public async Task<AuthenticationResult> GetTokenForUser(User user)
        {
            if (user == null)
                return new AuthenticationResult
                {
                    Errors = new[] { "User not found!" }
                };

            var authClaims = await TokenUtilities.GetAuthClaimsAsync(user, _userManager);

            var token = await TokenUtilities.CreateTokenAsync(authClaims, _configuration, _context);

            return new AuthenticationResult
            {
                Success = true,
                Token = token
            };

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

            var token = await TokenUtilities.CreateTokenAsync(authClaims, _configuration, _context);

            return new AuthenticationResult
            {
                Success = true,
                Token = token
            };
        }
        public async Task<User> GetUserFromLoginRequest(MobileLoginRequest mobileLoginRequest)
        {
            User user = new User();

            if (mobileLoginRequest.Email != null)
                user = await _userManager.FindByEmailAsync(mobileLoginRequest.Email);
            else
                user = _userManager.Users.FirstOrDefault(u => u.PhoneNumber == mobileLoginRequest.Phone);

            if (user == null)
                throw new Exception("User not found");

            if (!await _userManager.CheckPasswordAsync(user, mobileLoginRequest.Password))
                throw new Exception("Email/Phone/Password combination mismatch!");


            if ((mobileLoginRequest.Email != null && !user.EmailConfirmed) || (mobileLoginRequest.Phone != null && !user.PhoneNumberConfirmed))
                throw new Exception("Provided email/phone is not confirmed!");

            return user;
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

                    var jwtToken = await TokenUtilities.CreateTokenAsync(authClaims, _configuration, _context);

                    return new AuthenticationResult
                    {
                        Success = true,
                        Token = jwtToken
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

                        var jwtToken = await TokenUtilities.CreateTokenAsync(authClaims, _configuration, _context);

                        return new AuthenticationResult
                        {
                            Success = true,
                            Token = jwtToken
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
            var userIds = _context.VendorUsers.Where(v => v.VendorId == vendorId).Select(u => u.UserId).ToList();
            var users = _userManager.Users.Where(user => userIds.Contains(user.Id)).ToList();
            return users;
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
                var token = await TokenUtilities.CreateTokenAsync(authClaims, _configuration, _context);

                return new AuthenticationResult
                {
                    Success = true,
                    Token = token
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

        public async Task<GetUserResponse> GetUserWithRolesById(string id)
        {
            var user = _userManager.Users.FirstOrDefault(u => u.Id == id);
            return new GetUserResponse()
            {
                user = user,
                userRole = await _userManager.GetRolesAsync(user),

            };
        }

        public IEnumerable<IdentityRole> GetRoles()
        {
            return _roleManager.Roles;
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

            if (newUser.Type == null)
            {
                newUser.Type = "Person";
            }

            newUser.EmailConfirmed = true;
            newUser.PhoneNumberConfirmed = true;


            IdentityResult result = await _userManager.CreateAsync(newUser, model.Password);
            // _userManager.SaveChanges();

            return result.Succeeded ? newUser : null;
        }

        public async Task<IdentityResult> CreateUser(CreateRequest request)
        {
            var newUser = new User()
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address
            };

            var usernameTemplate = $"{request.FirstName.ToLower().First()}{request.LastName.ToLower()}";
            int number = 1;
            while (true)
            {
                string newUsername = $"{usernameTemplate}{number}";
                if (_userManager.Users.FirstOrDefault(u => u.UserName == newUsername) == null)
                {
                    newUser.UserName = newUsername;
                    break;
                }
                number++;
            }

            var result = await _userManager.CreateAsync(newUser);
            if (result.Succeeded)
            {
                var roleResult = await _userManager.AddToRoleAsync(newUser, request.Role);
                if (!roleResult.Succeeded)
                {
                    return roleResult;
                }
            }
            return result;
        }

        public async void SendConfirmationEmail(string email)
        {
            var user = GetUserByEmail(email);
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            EmailSender emailSender = new EmailSender(_configuration);
            await emailSender.SendConfirmationEmailAsync(email, $"http://siprojekat.duckdns.org:3000/user/setPassword?token={WebUtility.UrlEncode(token)}&id={user.Id}");
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
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.Address = request.Address;
            await _userManager.RemoveFromRolesAsync(user, await _userManager.GetRolesAsync(user));
            await _userManager.AddToRoleAsync(user, request.Role);

            return await _userManager.UpdateAsync(user);
        }

        public async void SendPasswordResetEmail(string email)
        {
            var user = GetUserByEmail(email);
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            EmailSender emailSender = new EmailSender(_configuration);
            await emailSender.SendPasswordResetEmailAsync(email, $"http://siprojekat.duckdns.org:3000/user/resetPassword?token={WebUtility.UrlEncode(token)}&id={user.Id}");
        }

        public async Task<IdentityResult> ResetPasswordAsync(SetPasswordRequest request)
        {
            var user = GetUserById(request.Id);
            var result = await _userManager.ResetPasswordAsync(user, request.Token, request.Password);
            return result;
        }

        public bool IsTokenValid(string jwt)
        {
            var validity = _context.TokenValidities.FirstOrDefault(x => x.Token.Equals(jwt));

            if (validity != null && validity.IsValid == false)
                throw new Exception("Token has been invalidated! Please login again.");

            return true;
        }

        public async Task InvalidateToken(string jwt)
        {
            var token = _context.TokenValidities.FirstOrDefault(x => x.Token.Equals(jwt));
            if (token != null)
                token.IsValid = false;

            await _context.SaveChangesAsync();
        }


        public async Task<Boolean> IsLoggedInUserAdmin()
        {
            var loggedInUser = await _userManager.GetUserAsync(_httpContext.HttpContext.User);
            if (loggedInUser == null)
            {
                throw new Exception("Not logged in");
            }
            return await _signInManager.UserManager.IsInRoleAsync(loggedInUser, "Admin");
        }


        public async Task<IdentityResult> EditUserAdmin(EditRequest request)
        {
            var isAdmin = await IsLoggedInUserAdmin();

            if (isAdmin == false)
            {
                throw new Exception("User is not authorized to edit.");
            }
            return await EditUser(request);
        }


        #region VendorUsers

        public async Task<IEnumerable<User>> GetUsersForVendor(int adminId)
        {
            var vendorUsers = await _vendorService.GetVendorUsersForAdmin(adminId);
            if (vendorUsers == null)
            {
                return null;
            }

            List<User> users = new List<User>();

            foreach (var vu in vendorUsers)
            {
                users.Add(GetUserById(vu.UserId));
            }

            return users.ToList();
        }

        public async Task<IdentityResult> EditVendorUser(EditRequest request, int adminId)
        {
            var result = await _vendorService.IsVendorUserAdmin(adminId);
            if (result == false)
            {
                throw new Exception("User is not authorized to edit vendor user.");
            }
            return await EditUser(request);

        }

        #endregion

    }
}
