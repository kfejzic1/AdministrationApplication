using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Services.Transaction;
using AdministrationAPI.Utilities;
using Microsoft.AspNetCore.Mvc;

namespace AdministrationAPI.Controllers.Transaction
{

    [Route("api/transactions")]
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
                var headers = Request.Headers;
                response = await _transactionService.GetTransactions(options);

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
                response = await _transactionService.GetTransactions(options);

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
                response = await _transactionService.GetTransactionByID(id);

            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response);
        }

    }
}