using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ExchangeRateController : ControllerBase
    {

        private readonly IExchangeRateService _exchangeRateService;

        public ExchangeRateController(IExchangeRateService exchangeRateService)
        {
            _exchangeRateService = exchangeRateService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllExchangeRates()
        {
            return Ok(await _exchangeRateService.GetExchangeRates());
        }

        [HttpGet("currency")]
        public async Task<IActionResult> GetAllCurrencies()
        {
            return Ok(await _exchangeRateService.GetCurrencies());
        }

        [HttpPost]
        public async Task<IActionResult> AddExchangeRate([FromBody] ExchangeRateRequest exchangeRateRequest)
        {
            try
            {
                await _exchangeRateService.AddExchangeRate(exchangeRateRequest);

                return Ok("Exchange rate successfully added");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddExchangeRate");
                return BadRequest("Failed to add exchange rate");
            }
        }

        [HttpPost("currency")]
        public async Task<IActionResult> AddCurrency([FromBody] CurrencyRequest currencyRequest)
        {
            try
            {
                await _exchangeRateService.AddCurrency(currencyRequest);

                return Ok("Currency successfully added");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "ExchangeController.AddCurrency");
                return BadRequest("Failed to add currency");
            }
        }
    }
}
