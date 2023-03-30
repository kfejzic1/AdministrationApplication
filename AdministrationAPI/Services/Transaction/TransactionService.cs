using AdministrationAPI.Data;
using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.Services.Transaction
{
    public class TransactionService : ITransactionService
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;

        public TransactionService(IMapper mapper, DataContext context)
        {
            _mapper = mapper;
            _context = context;

        }

        public async Task<TransactionResponseDTO> GetAllTransactions(int pageNumber, int pageSize)
        {

            if (pageNumber < 0) throw new ArgumentException("Page number cannot be negative");
            if (pageSize < 0) throw new ArgumentException("Page size cannot be negative");

            if (pageNumber == 0) pageNumber = 1;
            if (pageSize == 0) pageSize = _context.Transactions.Count();
            Console.WriteLine("COUNTCOUNT" + _context.Transactions.Count());
            var pageCount = Math.Ceiling(_context.Transactions.Count() / (double)pageSize);
            var dbTransactions = await _context.Transactions
                .Skip((pageNumber - 1) * (int)pageSize)
                .Take((int)pageSize).ToListAsync();
            var response = new TransactionResponseDTO
            {
                Transactions = dbTransactions.Select(transaction => _mapper.Map<TransactionDTO>(transaction)).ToList(),
                CurrentPage = pageNumber,
                Pages = (int)pageCount

            };

            if (response.Transactions.Count == 0) throw new Exception("There are no transactions.");

            return response;
        }
        public async Task<List<TransactionDTO>> GetSortedTransactions(SortingOptions sortingOptions, bool ascending = true)
        {
            var transactions = _context.Transactions.AsQueryable();
            var orderedTransactions = transactions;
            if (sortingOptions == SortingOptions.Amount) orderedTransactions = ascending ? transactions.OrderBy(t => t.Amount) : transactions.OrderByDescending(t => t.Amount);
            else if (sortingOptions == SortingOptions.Recipient) orderedTransactions = ascending ? transactions.OrderBy(t => t.Recipient) : transactions.OrderByDescending(t => t.Recipient);
            else orderedTransactions = ascending ? transactions.OrderBy(t => t.DateTime) : transactions.OrderByDescending(t => t.DateTime);
            var dbTransactions = await orderedTransactions.ToListAsync();

            return dbTransactions.Select(transaction => _mapper.Map<TransactionDTO>(transaction)).ToList();
        }

        public async Task<TransactionDetailsDTO> GetTransactionByID(int id)
        {
            if (id < 1) throw new Exception("You have specified an invalid id.");
            var dbTransaction = await _context.Transactions.FirstOrDefaultAsync(transaction => transaction.Id == id);
            if (dbTransaction is null) throw new Exception("No transaction corresponds to the given id.");
            return _mapper.Map<TransactionDetailsDTO>(dbTransaction);
        }

        public async Task<List<TransactionDTO>> GetTransactionsByFilter(DateTime? dateTimeStart = null, DateTime? dateTimeEnd = null, string? recipient = null, int? amount = null, TransactionStatus? status = null)
        {
            var transactions = _context.Transactions.AsQueryable();
            if (dateTimeStart == null && dateTimeEnd != null) dateTimeStart = dateTimeEnd;
            if (dateTimeEnd == null && dateTimeStart != null) dateTimeEnd = dateTimeStart;

            if (dateTimeStart != null && dateTimeEnd != null)
            {
                transactions = transactions.Where(t => t.DateTime >= dateTimeStart && t.DateTime <= dateTimeEnd);
            }

            if (recipient != null)
            {
                transactions = transactions.Where(t => t.Recipient == recipient);
            }
            if (amount != null && amount != 0)
            {
                transactions = transactions.Where(t => t.Amount == amount);
            }
            if (status != null && amount != 0)
            {
                transactions = transactions.Where(t => t.Status == status);
            }
            var dbTransactions = await transactions.ToListAsync();
            return dbTransactions.Select(transaction => _mapper.Map<TransactionDTO>(transaction)).ToList();
        }


    }
}