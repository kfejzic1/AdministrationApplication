using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Voucher;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   //[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VoucherRedemptionController : ControllerBase
    {

        private readonly IVoucherService _voucherService;
        private readonly IUserService _userService;

        private readonly IExchangeRateService _exchangeRateService;
        private readonly IExchangeService _exchangeService;

        public VoucherRedemptionController(IVoucherService voucherService, IUserService userService, IExchangeRateService exchangeRateServices, IExchangeService exchangeService)
        {
            _voucherService = voucherService;
            _userService = userService;
            _exchangeRateService = exchangeRateServices;
            _exchangeService = exchangeService;
        }

        [HttpPost("RedeemVoucher")]
        public async Task<IActionResult> RedeemVoucher([FromBody] RedeemVoucherRequest code,[FromQuery] string token1)
        {
            try
            {
                string tokenForPS = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        tokenForPS = header.Value;
                }
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                User user = _userService.GetUserByName(token.Username);
                if (user == null)
                    return BadRequest("User with this username doesn't exist!");
                Voucher voucher = _voucherService.GetVoucherByCode(code.Code);
                if (voucher == null)
                    return BadRequest("Voucher with this code doesn't exist!");
                if (voucher.VoucherStatusId != "2")
                    return BadRequest("Voucher is not active!");
                var currencyList = await _exchangeRateService.GetCurrencies();
                for (var i = 0; i < currencyList.Count; i++)
                {
                    if (currencyList.ElementAt(i).Id == voucher.CurrencyId)
                    {
                   //ovdje ispod ide tokenForPS umejsto token1 i bearer izbrisati,
                        var response = await _exchangeService.GetUserAccounts(token1);
                        if (response.obj != null)
                        {
                            for(var j=0; j < response.obj.Count;j++)
                            {
                                if (response.obj[j].Currency==currencyList.ElementAt(i).Name)
                                {
                                    //all ok, now we redeem 
                                    voucher = await _voucherService.RedeemVoucher(user, code.Code);
                                    return Ok(voucher);
                                }    
                            }
                            return BadRequest("User doesn't have account in this currency");
                        }
                        else if (response.message != "")
                            return BadRequest(response.message);
                        else return BadRequest("User doesn't have an account!");
                    }
                }
                ////////////////////////////
                    return BadRequest("Failed!");
            }
            catch (Exception ex)
            {
                return BadRequest("Failed: "+ex.Message);
            }

        }
       
    }
}
