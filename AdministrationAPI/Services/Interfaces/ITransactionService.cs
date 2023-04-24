using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface ITransactionService
    {
        Task<List<TransactionDTO>> GetTransactions(string token, TransactionQueryOptions options);
        Task<TransactionDetailsDTO> GetTransactionByID(int id, string token);

        Task<TransactionDetailsDTO> CreateTransaction(TransactionCreateRequest req);
        Task<List<TransactionTransfer>> GetGroupedTransactionsByCurrency(string token);
        Task<List<TransactionTransfer>> GetGroupedTransactionsByType(string token);
    }
}