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
        [HttpPost("user-accounts-id")]

        public IActionResult getAccountsWithId([FromBody] UserIdRequest userIdRequest)
        {
            try
            {
                var accounts = _accountService.GetAccountsForUser(userIdRequest.UserId);
                return Ok(accounts);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.getAccountsWithId");
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPost("user-accounts-username")]
        public IActionResult getAccountsWithUsername([FromBody] UserRequest userRequest)
        {
            try
            {
                //ne radi
                // var id = _accountService.getIdFromUsername(userRequest.UserName);
                //var accounts = _accountService.GetAccountsForUser(id);
                var accounts = _accountService.GetAccountsForUserName(userRequest.UserName);

                return Ok(accounts);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.getAccountsWithUsername");
                return StatusCode(500, ex.Message);
            }
        }
    }
}