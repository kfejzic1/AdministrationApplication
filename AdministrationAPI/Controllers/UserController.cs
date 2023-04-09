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

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
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
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser([FromBody] CreateRequest request)
        {
            try
            {
                if (_userService.GetUserByEmail(request.Email)!=null)
                {
                    var result = new ObjectResult(new { statusCode = 204, message = "User with this email already exists!" });
                    result.StatusCode = 204;
                    return result;
                }

                var createResult = await _userService.CreateUser(request);
                if (createResult.Succeeded)
                {
                    var user =  _userService.GetUserByEmail(request.Email);
                    if (user == null)
                    {
                        return new ObjectResult(new { statusCode = 505, message = "Error while creating customer" });
                    }

                    _userService.SendConfirmationEmail(user.Id);

                    var resultCreation = new ObjectResult(new { statusCode = 201, message = "User created and confirmation email is sent to " + user.Email + " succesfully" });
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
        [AllowAnonymous]
        public async Task<IActionResult> EditUser([FromBody] EditRequest request)
        {
            var user = _userService.GetUserById(request.Id);
            if(user == null)
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

        [HttpGet("{id}")]
        [AllowAnonymous]
        public IActionResult GetUser([FromRoute] string id)
        {
            var user = _userService.GetUserById(id);
            if (user == null)
            {
                return Ok(user);
            }
            return BadRequest("Invalid ID");
        }

        [HttpPost("forgotPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = _userService.GetUserById(request.Id);
            if (user == null)
            {
                return BadRequest("User not found");
            }
            if(user.EmailConfirmed == false)
            {
                return BadRequest("User didn't finish the account creation process");
            }

             _userService.SendPasswordResetEmail(user.Email);

            return Ok("You may now reset your password");

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
                return BadRequest("Invalid token");
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
