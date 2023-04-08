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
                return NotFound(new { message = "User with specified username not found!" });
            
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
