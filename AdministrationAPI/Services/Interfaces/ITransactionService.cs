using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.Services.Transaction
{
    public interface ITransactionService
    {
        Task<TransactionResponseDTO> GetTransactions(string userId, TransactionQueryOptions options);
        Task<TransactionDetailsDTO> GetTransactionByID(int id);
    }
}