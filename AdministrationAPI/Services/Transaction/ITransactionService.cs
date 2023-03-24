using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdministrationAPI.DTOs;

namespace AdministrationAPI.Services.Transaction
{
    public interface ITransactionService
    {
        Task<List<TransactionDTO>> GetAllTransactions();
        Task<TransactionDetailsDTO> GetTransactionByID(int id);
    }
}