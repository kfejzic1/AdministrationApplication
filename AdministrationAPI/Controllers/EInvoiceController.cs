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
using AdministrationAPI.Contracts.Requests.EInvoices;

namespace AdministrationAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class EInvoiceController : ControllerBase
    {
        private readonly IEInvoiceService _eInvoiceService;
        private readonly IUserService _userService;
        public EInvoiceController(IEInvoiceService eInvoiceService, IUserService userService)
        {
            _eInvoiceService = eInvoiceService;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("createEInvoice")]
        public async Task<IActionResult> CreateEInvoice([FromBody] EInvoiceCreateRequestOneLiner eInvoiceRequestOneLiner)
        {
            try
            {
                var eInvoice = _eInvoiceService.CreateEInvoice(eInvoiceRequestOneLiner);
                return Ok(eInvoice);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.getAccountsWithId");
                return StatusCode(500, ex.Message);
            }

        }

        [HttpGet("listEInvoices")]
        public async Task<IActionResult> ListEInvoices()
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                var userId = ControlExtensions.GetId(HttpContext);
                var eInvoices = _eInvoiceService.ListEInvoices(userId);
                return Ok(eInvoices);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.getAccountsWithId");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("payEinvoice/{id}")]
        public async Task<IActionResult> PayEinvoice(int id)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                var eInvoice = _eInvoiceService.PayEnvoice(id);
                return Ok(eInvoice);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "AccountController.getAccountsWithId");
                return StatusCode(500, ex.Message);
            }
        }

    }
}
