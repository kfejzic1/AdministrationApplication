using AdministrationAPI.Data;
using AdministrationAPI.DTOs;
using AutoMapper;
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

        public async Task<List<TransactionDTO>> GetAllTransactions()
        {
            var dbTransactions = await _context.Transactions.ToListAsync();
            return dbTransactions.Select(transaction => _mapper.Map<TransactionDTO>(transaction)).ToList();
        }

        public async Task<TransactionDetailsDTO> GetTransactionByID(int id)
        {
            var dbTransaction = await _context.Transactions.FirstOrDefaultAsync(transaction => transaction.Id == id);
            return _mapper.Map<TransactionDetailsDTO>(dbTransaction);
        }
   }
}