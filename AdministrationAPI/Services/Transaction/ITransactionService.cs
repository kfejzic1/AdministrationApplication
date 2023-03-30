using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.Services.Transaction
{
    public interface ITransactionService
    {
        Task<TransactionResponseDTO> GetAllTransactions(int pageNumber, int pageSize);
        Task<TransactionDetailsDTO> GetTransactionByID(int id);
        Task<List<TransactionDTO>> GetTransactionsByFilter(DateTime? dateTimeStart = null, DateTime? dateTimeEnd = null, string? recipient = null, int? amountMin = null, int? amountMax = null, TransactionStatus? status = null);
        Task<List<TransactionDTO>> GetSortedTransactions(SortingOptions sortingOptions, bool ascending = true);
    }
}