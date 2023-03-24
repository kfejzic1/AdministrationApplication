using AdministrationAPI.Data;
using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

            if (!_context.Database.CanConnect())
            {
                throw new Exception("Unable to connect to database.");
            }

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
            return response;
        }

        public async Task<TransactionDetailsDTO> GetTransactionByID(int id)
        {
            var dbTransaction = await _context.Transactions.FirstOrDefaultAsync(transaction => transaction.Id == id);
            return _mapper.Map<TransactionDetailsDTO>(dbTransaction);
        }
    }
}