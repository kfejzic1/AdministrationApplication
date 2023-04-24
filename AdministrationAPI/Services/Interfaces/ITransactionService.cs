using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Contracts.Requests.Transactions;

namespace AdministrationAPI.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<TransactionResponseDTO> GetTransactions(string userId, TransactionQueryOptions options);
        Task<TransactionDetailsDTO> GetTransactionByID(int id, string userId);
        Task<TransactionDetailsDTO> CreateTransaction(TransactionCreateRequest req);
        int CreateTransactionClaim(ClaimCreateRequest request, string userId);
    }
}