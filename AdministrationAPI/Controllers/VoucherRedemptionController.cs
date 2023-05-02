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
        public async Task<IActionResult> RedeemVoucher([FromBody] string code)
        {

           
            try
            {
                string token = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        token = header.Value;
                }

                ///////////////////////////////
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                var userId = ControlExtensions.GetId(HttpContext);
               var  userTemp = await _userService.GetUser(userId);

                User user = _userService.GetUserByName(userTemp.UserName);
                Voucher voucher = _voucherService.GetVoucherByCode(code);
                if (voucher.VoucherStatusId != "1")
                    return BadRequest("Voucher is not active!");
                var currencyList = await _exchangeRateService.GetCurrencies();
                for (var i = 0; i < currencyList.Count; i++)
                {
                    if (currencyList.ElementAt(i).Id == voucher.CurrencyId)
                    {
                        var response = await _exchangeService.GetUserAccounts(token);
                        if (response.obj != null)
                        {
                            for(var j=0; j < response.obj.Count;j++)
                            {
                                if (response.obj[j].Currency==currencyList.ElementAt(i).Country)
                                {
                                    //all ok, now we redeem 
                                    voucher = await _voucherService.RedeemVoucher(user, code);
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
                    return BadRequest("Failed");
            }
            catch (Exception ex)
            {
                return BadRequest("Failed");
            }

        }
       
    }
}
