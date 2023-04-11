using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Extensions;
using AdministrationAPI.Utilities;
using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using Facebook;
using AdministrationAPI.Helpers;
using AdministrationAPI.Models;
using AdministrationAPI.Services;
using Microsoft.AspNetCore.Identity;
using System.Net;
using AdministrationAPI.Contracts.Requests.Users;

namespace AdministrationAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        private readonly IActivationCodeService _activationCodeService;

        public UserController(IUserService userService, IMapper mapper, IActivationCodeService activationCodeService, IConfiguration configuration)
        {
            _userService = userService;
            _mapper = mapper;
            _activationCodeService = activationCodeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            try
            {
                var userId = ControlExtensions.GetId(HttpContext);
                var user = await _userService.GetUser(userId);

                return Ok(user);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.UserById");
                return StatusCode(500, ex.Message);
            }
        }

        //when frontend groups create test users
        //they should be able to delete them without tinkering with database
        [AllowAnonymous]
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteUser([FromQuery] string username)
        {
            if (await _userService.DeleteUserAsync(username))
            {
                return Ok("User deleted");
            }
            else
            {
                return NotFound("User not found");
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {
            User user = await _userService.Register(model);

            if(user == null){
                return BadRequest("User not created. Password must contain at least one uppercase letter, a digit and a non-alphanumeric character. Password must be at least six characters long.");
                
            }

            bool success = await _activationCodeService.GenerateCodeForUserAsync(user);

            if (success)
            {
                return Ok(new { message = "Registration successful" });
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Email not delivered!");
            }
        }

        [AllowAnonymous]
        [HttpGet("send/sms")]
        public async Task<IActionResult> SendCodeToPhone([FromQuery] SMSInformationRequest smsInformationRequest)
        {
            try
            {
                User user = _userService.GetUserByName(smsInformationRequest.Username);

                if (user == null)
                {
                    return NotFound(new { message = "User with specified username not found!" });
                }

                bool success = await _activationCodeService.SendSMSToUser(user);

                if (success)
                {
                    return Ok(new { message = "SMS delivered" });
                }
                else
                {
                    return NotFound(new { message = "SMS activation code for user not found!" });
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "SMS not delivered!");
            }
            
        }

        [AllowAnonymous]
        [HttpPost("confirm/email")]
        public async Task<IActionResult> ConfirmEmail([FromBody] ActivationRequest activationRequest)
        {
            bool activationResult = await _activationCodeService.ActivateEmailCodeAsync(activationRequest.Code, activationRequest.Username);
            if (activationResult)
            {
                return Ok(new { message = "Activation successful" });
            }
            else
            {
                return BadRequest(new { message = "Username or code incorrect!" });
            }
        }

        [AllowAnonymous]
        [HttpPost("confirm/phone")]
        public async Task<IActionResult> ConfirmPhone([FromBody] ActivationRequest activationRequest)
        {
            bool activationResult = await _activationCodeService.ActivateSMSCodeAsync(activationRequest.Code, activationRequest.Username);
            if (activationResult)
            {
                return Ok(new { message = "Activation successful" });
            }
            else
            {
                return BadRequest(new { message = "Username or code incorrect!" });
            }
        }


        [HttpGet("2fa-qrcode")]
        public async Task<IActionResult> Get2FAQRCode()
        {
            try
            {
                var userId = ControlExtensions.GetId(HttpContext);
                var qrCode = await _userService.GetTwoFactorQRCode(userId);

                return Ok(qrCode);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.TwoFactorQrCode");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPatch("2fa-toggle")]
        public async Task<IActionResult> Toggle2FA()
        {
            try
            {
                var userId = ControlExtensions.GetId(HttpContext);
                var result = await _userService.Toggle2FA(userId);

                return Ok(result);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.Toggle2FA");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] CreateRequest request)
        {
            try
            {
                if (_userService.GetUserByEmail(request.Email) != null)
                {
                    var result = new ObjectResult(new { statusCode = 204, message = "User with this email already exists!" });
                    result.StatusCode = 204;
                    return result;
                }

                var createResult = await _userService.CreateUser(request);
                if (createResult.Succeeded)
                {
                    var user = _userService.GetUserByEmail(request.Email);
                    if (user == null)
                    {
                        return new ObjectResult(new { statusCode = 505, message = "Error while creating customer" });
                    }

                    _userService.SendConfirmationEmail(user.Email);

                    var resultCreation = new ObjectResult(new { statusCode = 201, message = "User created and confirmation email has been sent to " + user.Email + " succesfully" });
                    resultCreation.StatusCode = 201;
                    return resultCreation;
                }
                else return new ObjectResult(new { statusCode = 505, message = "Error while creating customer" });


            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.CreateUser");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                var authenticationResult = await _userService.Login(loginRequest);

                if (authenticationResult.TwoFactorEnabled)
                    return Ok(authenticationResult);

                if (authenticationResult.Success)
                    return Ok(_mapper.Map<AuthenticationResult, AuthSuccessResponse>(authenticationResult));
                else
                    return BadRequest(_mapper.Map<AuthenticationResult, AuthFailResponse>(authenticationResult));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.Login");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login/facebook")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginFacebook([FromQuery] string token)
        {
            try
            {
                var authenticationResult = await _userService.FacebookSocialLogin(token);

                if (authenticationResult.TwoFactorEnabled)
                    return Ok(authenticationResult);

                if (authenticationResult.Success)
                    return Ok(_mapper.Map<AuthenticationResult, AuthSuccessResponse>(authenticationResult));
                else
                    return BadRequest(_mapper.Map<AuthenticationResult, AuthFailResponse>(authenticationResult));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.LoginFacebook");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login/google")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginGoogle([FromQuery] string token)
        {
            try
            {
                var authenticationResult = await _userService.GoogleSocialLogin(token);

                if (authenticationResult.TwoFactorEnabled)
                    return Ok(authenticationResult);

                if (authenticationResult.Success)
                    return Ok(_mapper.Map<AuthenticationResult, AuthSuccessResponse>(authenticationResult));
                else
                    return BadRequest(_mapper.Map<AuthenticationResult, AuthFailResponse>(authenticationResult));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.Login");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("login2FA")]
        [AllowAnonymous]
        public async Task<IActionResult> LoginWithCode([FromBody] Login2FARequest loginRequest)
        {
            try
            {
                var authenticationResult = await _userService.Login2FA(loginRequest);

                if (authenticationResult.Success)
                    return Ok(_mapper.Map<AuthenticationResult, AuthSuccessResponse>(authenticationResult));
                else
                    return BadRequest(_mapper.Map<AuthenticationResult, AuthFailResponse>(authenticationResult));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.Login2FA");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("setPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> SetUserPassword([FromBody] SetPasswordRequest request)
        {
            var customer = _userService.GetUserById(request.Id);
            if (customer == null)
            {
                return NotFound("User not found.");
            }
            if (request.Password == null)
            {
                return BadRequest("Password can't be null");
            }

            var result = await _userService.SetPassword(request);

            if (result.Succeeded)
            {
                return Ok("Password set succesfully");
            }
            else
            {
                return BadRequest("Invalid token");
            }
        }

        [HttpPatch("edit")]
        public async Task<IActionResult> EditUser([FromBody] EditRequest request)
        {
            var user = _userService.GetUserById(request.Id);
            if (user == null)
            {
                return BadRequest("User doesn't exist");
            }
            var result = await _userService.EditUser(request);
            if (result.Succeeded)
            {
                return Ok("User successfully updated");
            }
            else
            {
                return BadRequest("Error while updating user");
            }
        }

        [HttpGet("allWithRoles")]
        public IActionResult GetAllUsersWithRoles()
        {
            var users = _userService.GetAllUsers();
            var usersWithRoles = users.Select(u => _userService.GetUserWithRolesById(u.Id));
            return Ok(usersWithRoles);

        }

        [HttpGet("all")]
        public IActionResult GetAllUsers()
        {
            try
            {
                var users = _userService.GetAllUsers();
                return Ok(users);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.Login");
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("roles")]
        public IEnumerable<IdentityRole> GetRoles()
        {
            return _userService.GetRoles();
        }

        [HttpGet("byId/{id}")]
        public Task<GetUserResponse> GetUser([FromRoute] string id)
        {
            return _userService.GetUserWithRolesById(id);
        }

        [HttpPost("forgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = _userService.GetUserById(request.Id);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            if (user.EmailConfirmed == false)
            {
                return BadRequest("User didn't finish the account creation process");
            }

            _userService.SendPasswordResetEmail(user.Email);

            return new ObjectResult(new { statusCode = 201, message = "Password reset link has been sent to user's email succesfully" });

        }

        [HttpPatch("resetPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] SetPasswordRequest request)
        {
            var user = _userService.GetUserById(request.Id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            var result = await _userService.ResetPasswordAsync(request);

            if (result.Succeeded)
            {
                return Ok("Password successfully changed.");
            }
            else
            {
                return BadRequest("Invalid token or token expired");
            }

        }

        [HttpGet("{name}")]
        public IActionResult GetUserByName([FromRoute] string name)
        {
            try
            {
                var users = _userService.GetUserByName(name);
                return Ok(users);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.Login");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("validate-token")]
        public IActionResult ValidateToken([FromQuery] string token)
        {
            try
            {
                var roles = TokenUtilities.VerifyToken(token);

                return Ok(roles);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.TwoFactorQrCode");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
