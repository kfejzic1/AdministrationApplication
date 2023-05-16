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
using AdministrationAPI.Contracts.Requests.Users;
using System.Diagnostics.Eventing.Reader;

namespace AdministrationAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : ControllerBase
    {


        private readonly IUserService _userService;
        private readonly IAccountService _accountService;

        public AccountController(IUserService userService, IAccountService accountService)
        {
            _userService = userService;
            _accountService = accountService;
        }

        [HttpGet("check")]
        public async Task<IActionResult> Check([FromQuery] string name, string accountNumber)
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            User user = _userService.GetUserByFirstName(name);

            if (user is null)
            {
                return NotFound("User with specified name not found");
            }
            else
            {
                if (user.AccountNumber is null)
                {
                    return BadRequest("User doesn't have account");
                }

                if (user.AccountNumber.Equals(accountNumber))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("User with specified name doesn't have specified account number");
                }
            }
        }

        [HttpGet("user-accounts")]
        public IActionResult GetUserAccounts()
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                var userId = ControlExtensions.GetId(HttpContext);

                var accounts = _accountService.GetUserAccountCreationRequests(userId);

                return Ok(accounts);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.getAccountsWithId");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("user-account-create")]
        public async Task<IActionResult> CreateUserAccount([FromBody] AccountCreationRequestCreateRequest request)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                var userId = ControlExtensions.GetId(HttpContext);
                request.UserId = userId;
                request.RequestDocumentPath = request.RequestDocumentPath + userId + "/" + request.CurrencyId;

                try
                {
                    var result = await _accountService.CreateUserAccountCreationRequest(request);
                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest("Account request with this currency already exists.");
                }


            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.CreateUserAccount");
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("accounts")]
        public IActionResult ListAccounts()
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));

                var result = _accountService.GetAllAccounts();

                return Ok(result);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.CreateUserAccount");
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("requests")]
        public IActionResult ListRequests()
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));

                var result = _accountService.GetAllRequests();

                return Ok(result);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.CreateUserAccount");
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("approve")]
        public async Task<IActionResult> ApproveRequest([FromQuery] int id)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));

                var result = await _accountService.ApproveRequest(id, ControlExtensions.GetToken(HttpContext));
                if (result != null)
                {
                    return Ok(result);
                }
                
                return BadRequest("Erorr");
                
                
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.CreateUserAccount");
                return StatusCode(500, ex.Message);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpGet("history")]
        public IActionResult RequestHistory()
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));

                var result = _accountService.GetRequestHistory();

                return Ok(result);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.CreateUserAccount");
                return StatusCode(500, ex.Message);
            }
        }

    }
}