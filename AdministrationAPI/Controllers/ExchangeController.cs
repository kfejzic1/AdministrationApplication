using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
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
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
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
        private readonly IUserService _userService;

        public ExchangeController(IExchangeService exchangeService, IUserService userService)
        {
            _exchangeService = exchangeService;
            _userService = userService;
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
                        token = header.Value;
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
        [HttpPost("CreateExchangeTransaction")]
        public async Task<IActionResult> MakeExchangeTransaction([FromBody] ExchangeTransactionRequest transactionRequest)
        {
            try
            {
                string token = "";
                foreach (var header in Request.Headers)
                {
                    if (header.Key.CompareTo("Authorization") == 0)
                        token = header.Value;
                }
                //check
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token1 = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                User user = _userService.GetUserByName(token1.Username);
                if (user == null)
                    return BadRequest("User with this username doesn't exist!");
                if (transactionRequest.SenderCurrency == transactionRequest.RecipientCurrnecy)
                    return BadRequest("Same currency");
                var response = await _exchangeService.GetAllAccounts(token);
                if (response.obj != null)
                {
                    Console.Write(",oja=");
                    Console.WriteLine(response.obj[0].Owner.UserId);
                    Console.WriteLine(user.Id);
                    for (var j = 0; j < response.obj.Count; j++)
                    {
                        if (response.obj[j].Owner.UserId == user.Id&& response.obj[j].Currency==transactionRequest.SenderCurrency)
                        {
                            Console.WriteLine("evog as sadddd");
                            for (var r = j; r < response.obj.Count; r++)
                            {
                                if (response.obj[r].Owner.UserId == user.Id && response.obj[r].Currency == transactionRequest.RecipientCurrnecy)
                                {
                                    var transaction = new TransactionRequest();
                                    transaction.Amount = transactionRequest.Amount;
                                    transaction.TransactionPurpose = transactionRequest.TransactionPurpose;
                                    transaction.Currency = transactionRequest.SenderCurrency;

                                    var sender = new SenderRequest();
                                    sender.AccountNumber= response.obj[j].AccountNumber;
                                    transaction.Sender = sender;
                                    var recipient = new RecipientRequest();
                                    recipient.AccountNumber= response.obj[r].AccountNumber;
                                    recipient.Name = response.obj[r].Owner.Name;
                                    transaction.Recipient = recipient;
                                    transaction.Recipient.Name = response.obj[r].Owner.Name;
                                    transaction.Category = "Exchange";
                                    transaction.TransactionType = "C2C";
                                    var response2 = await _exchangeService.MakeTransaction(transaction, token);
                                    if (response2.obj != null)
                                        return Ok(response2.obj);
                                    else if (response2.message != "")
                                        return BadRequest(response2.message);
                                    else return BadRequest("Failed");
                                }

                            }
                            return BadRequest("Account with this currency doesn't exist!");
                        }

                    }
                    return BadRequest("Account with this currency doesn't exist!");
                }
                else if (response.message != "")
                    return BadRequest(response.message);
                else return BadRequest("User doesn't have an account!");
               
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                return BadRequest("Failed");
            }
        }
    }
}