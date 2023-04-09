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

        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("check")]
        public async Task<IActionResult> Check([FromQuery] string name, string accountNumber)
        {
            User user = _userService.GetUserByFirstName(name);

            if (user is null) {
                return NotFound("User with specified name not found");
            }
            else {
                if (user.AccountNumber is null) {
                    return BadRequest("User doesn't have account");
                }

                if (user.AccountNumber.Equals(accountNumber)) {
                    return Ok();
                }
                else {
                    return BadRequest("User with specified name doesn't have specified account number");
                }
            }
        }
    }
}