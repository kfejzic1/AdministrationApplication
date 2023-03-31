using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.Services.Transaction
{
    public interface ITransactionService
    {
        Task<TransactionResponseDTO> GetTransactions(TransactionQueryOptions options);
        Task<TransactionDetailsDTO> GetTransactionByID(int id);
    }
}