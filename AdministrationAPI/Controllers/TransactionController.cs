using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AdministrationAPI.Contracts.Requests;
using Microsoft.AspNetCore.Mvc;


namespace AdministrationAPI.Controllers.Transaction
{

    [Route("api/transactions")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TransactionController : ControllerBase
    {


        private readonly ITransactionService _transactionService;

        public TransactionController(ITransactionService transactionService)
        {
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionDTO>>> GetTransactions([FromQuery] TransactionQueryOptions options)
        {
            TransactionResponseDTO response;

            try
            {
                var userId = ControlExtensions.GetId(HttpContext);
                response = await _transactionService.GetTransactions(userId, options);
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response.Transactions);
        }

        [HttpGet("test")]
        public async Task<ActionResult<List<TransactionDTO>>> GetTransactionsTest([FromQuery] TransactionQueryOptions options)
        {

            TransactionResponseDTO response;

            try
            {
                response = await _transactionService.GetTransactions("", options);

            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response.Transactions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDetailsDTO>> GetTransactionById(int id)
        {
            TransactionDetailsDTO response;

            try
            {
                var userId = ControlExtensions.GetId(HttpContext);
                response = await _transactionService.GetTransactionByID(id, userId);
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<TransactionDetailsDTO>> CreateTransaction([FromBody] TransactionCreateRequest req)
        {
            TransactionDetailsDTO res;
            try
            {
                res = await _transactionService.CreateTransaction(req);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "TransactionController.CreateTransaction");
                return StatusCode(500, ex.Message);
            }
            return res;
        }

    }
}