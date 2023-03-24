using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using Microsoft.AspNetCore.Mvc;

namespace AdministrationAPI.Services.Transaction
{
    public interface ITransactionService
    {
        Task<TransactionResponseDTO> GetAllTransactions(int pageNumber, int pageSize);
        Task<TransactionDetailsDTO> GetTransactionByID(int id);
    }
}