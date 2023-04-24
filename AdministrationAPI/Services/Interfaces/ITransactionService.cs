using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Models;
using AdministrationAPI.Contracts.Requests.Transactions;

namespace AdministrationAPI.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<List<TransactionDTO>> GetTransactions(string token, TransactionQueryOptions options);
        Task<TransactionDTO> GetTransactionByID(int id, string token);

        Task<TransactionDetailsDTO> CreateTransaction(TransactionCreateRequest req);
        int CreateTransactionClaim(ClaimCreateRequest request, string userId);
        Task<List<TransactionTransfer>> GetGroupedTransactionsByCurrency(string token);
        Task<List<TransactionTransfer>> GetGroupedTransactionsByType(string token);
    }
}