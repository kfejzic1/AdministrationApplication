using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Services.Transaction;
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
        public async Task<ActionResult<List<TransactionDTO>>> GetAllTransactions([FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            TransactionResponseDTO response;

            try
            {
                response = await _transactionService.GetAllTransactions(pageNumber, pageSize);

                if (response.Transactions.Count == 0)
                {
                    return NotFound("There are no transactions");
                }
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
            var response = await _transactionService.GetTransactionByID(id);
            if (response is null) return NotFound("There is no transaction with that id.");
            return Ok(response);
        }
    }
}