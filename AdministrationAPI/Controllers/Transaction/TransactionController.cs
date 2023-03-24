using AdministrationAPI.DTOs;
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
        public async Task<ActionResult<List<TransactionDTO>>> GetAllTransactions([FromQuery]int pageNumber, [FromQuery]int pageSize) 
        {
            var response = await _transactionService.GetAllTransactions(pageNumber, pageSize);
            // if(response.Transactions.Count == 0) return NotFound("No transactions have been made.");
            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TransactionDetailsDTO>> GetTransactionById(int id) 
        {
            var response = await _transactionService.GetTransactionByID(id);
            if(response is null) return NotFound("There is no transaction with that id.");
            return Ok(response);
        }
    }
}