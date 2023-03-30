using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Models.Transaction;
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

            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response.Transactions);
        }
        [HttpGet("filters")]
        public async Task<ActionResult<List<TransactionDTO>>> GetTransactionsByFilters([FromQuery] DateTime? dateTimeStart = null, [FromQuery] DateTime? dateTimeEnd = null, [FromQuery] string? recipient = null, [FromQuery] int? amount = null, [FromQuery] TransactionStatus? status = null)
        {

            List<TransactionDTO> response;
            try
            {
                response = await _transactionService.GetTransactionsByFilter(dateTimeStart, dateTimeEnd, recipient, amount, status);
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response);
        }
        [HttpGet("sort")]
        public async Task<ActionResult<List<TransactionDTO>>> GetSortedTransactions([FromQuery] SortingOptions sortingOptions, [FromQuery] bool ascending)
        {
            List<TransactionDTO> response;
            try
            {
                response = await _transactionService.GetSortedTransactions(sortingOptions, ascending);
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response);

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