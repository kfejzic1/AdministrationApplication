using AdministrationAPI.DTOs;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Extensions;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AdministrationAPI.Contracts.Requests;
using Microsoft.AspNetCore.Mvc;
using AdministrationAPI.Contracts.Requests.Transactions;
using AdministrationAPI.Models;

namespace AdministrationAPI.Controllers.Transaction
{

    [Route("api/transactions")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TransactionController : ControllerBase
    {

        private readonly IUserService _userService;
        private readonly ITransactionService _transactionService;

        public TransactionController(IUserService userService, ITransactionService transactionService)
        {
            _userService = userService;
            _transactionService = transactionService;
        }

        [HttpGet]
        public async Task<ActionResult<List<TransactionDTO>>> GetTransactions([FromQuery] TransactionQueryOptions options)
        {
            List<TransactionDTO> response;

            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                response = await _transactionService.GetTransactions(ControlExtensions.GetToken(HttpContext), options);
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
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
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
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                res = await _transactionService.CreateTransaction(req);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "TransactionController.CreateTransaction");
                return StatusCode(500, ex.Message);
            }
            return res;
        }

        [HttpPost("claim")]
        public IActionResult CreateTransactionClaim([FromBody] ClaimCreateRequest request)
        {
            try
            {
                string userId = ControlExtensions.GetId(HttpContext);
                return Ok(_transactionService.CreateTransactionClaim(request, userId));
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "TransactionController.CreateTransaction");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("group/type")]
        public async Task<ActionResult<List<TransactionTransfer>>> GetGroupedTransactionsByType()
        {
            List<TransactionTransfer> response;

            try
            {
                string token = ControlExtensions.GetToken(HttpContext);
                response = await _transactionService.GetGroupedTransactionsByType(token);
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response);
        }

        [HttpGet("group/currency")]
        public async Task<ActionResult<List<TransactionTransfer>>> GetGroupedTransactionsByCurrency()
        {
            List<TransactionTransfer> response;

            try
            {
                string token = ControlExtensions.GetToken(HttpContext);
                response = await _transactionService.GetGroupedTransactionsByCurrency(token);
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return Ok(response);
        }

    }
}