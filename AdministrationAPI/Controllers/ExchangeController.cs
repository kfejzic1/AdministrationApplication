using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ExchangeController : ControllerBase
    {

        private readonly IExchangeService _exchangeService;

        public ExchangeController(IExchangeService exchangeService)
        {
            _exchangeService = exchangeService;
        }

        [HttpPost("CreateAccount")]
        public async Task<IActionResult> CreateAccount([FromBody] ExchangeAccountRequest request)
        {
            try
            {
                string token = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        token = header.Value;
                }
                var response = await _exchangeService.CreateAccount(request, token);
                if (response.obj != null)
                    return Ok(response.obj);
                else if (response.message != "")
                    return BadRequest(response.message);
                else return BadRequest("Failed");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                return BadRequest("Failed");
            }

        }
        [HttpGet("GetUserAccounts")]
        public async Task<IActionResult> GetUserAccounts()
        {
            try
            {
                string token = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        token = header.Value;
                }
                var response = await _exchangeService.GetUserAccounts(token);
                if (response.obj != null)
                    return Ok(response.obj);
                else if(response.message!="")
                    return BadRequest(response.message);
                else return BadRequest("Failed");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                return BadRequest("Failed");
            }

        }
        [HttpGet("GetAllAccounts")]
        public async Task<IActionResult> GetaLLAccounts()
        {
            try
            {
                string token = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        token = header.Value;
                }
                var response = await _exchangeService.GetAllAccounts(token);
                if (response.obj != null)
                    return Ok(response.obj);
                else if (response.message != "")
                    return BadRequest(response.message);
                else return BadRequest("Failed");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                return BadRequest("Failed");
            }

        }



        [HttpPost("CreateTransaction")]
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
              var response=  await _exchangeService.MakeTransaction(transactionRequest,token);
                if (response.obj != null)
                    return Ok(response.obj);
                else if (response.message != "")
                    return BadRequest(response.message);
                else return BadRequest("Failed");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                return BadRequest("Failed");
            }
        }
    }
}