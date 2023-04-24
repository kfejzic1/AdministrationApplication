using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
  //  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ExchangeController : ControllerBase
    {

        private readonly IExchangeService _exchangeService;

        public ExchangeController(IExchangeService exchangeService)
        {
            _exchangeService = exchangeService;
        }

        [HttpPost("account")]
        public async Task<IActionResult> CreateAccount([FromBody] ExchangeAccountRequest request)
        {
            foreach (var header in Request.Headers)
            {
                if(header.Key.CompareTo("Authorization")==0)
                    Console.WriteLine(header.Value);
            }
            
            return Ok("radi");
        }

   

        [HttpPost("transaction")]
        public async Task<IActionResult> MakeTransaction([FromBody] TransactionRequest transactionRequest)
        {
            try
            {
                string token = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        token=header.Value;
                }
              var k=  await _exchangeService.MakeTransaction(transactionRequest,token);
             if(k != null)
                return Ok(k);
            else
                    return BadRequest("Failed");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                return BadRequest("Failed");
            }
        }
        [HttpPost("transactionWithPhoneNumber")]
        public async Task<IActionResult> MakeTransactionWithPhoneNumber([FromBody] TransactionPhoneDto transactionRequest)
        {
            try
            {
                string token = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        token = header.Value;
                }
                var k = await _exchangeService.MakeTransactionWithPhoneNumber(transactionRequest, token);
                if (k != null)
                    return Ok(k);
                else
                    return BadRequest("Failed");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                if (ex.Message.Contains("pss"))
                    return BadRequest("Error code: " + ex.Message.Substring(3));
                return BadRequest("Failed");
            }
        }
    }
}
