using AdministrationAPI.Data;
using AdministrationAPI.DTOs;
using AdministrationAPI.DTOs.Transaction;
using AdministrationAPI.Contracts.Requests;
using AutoMapper;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using AdministrationAPI.Contracts.Requests.Transactions;

namespace AdministrationAPI.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IMapper _mapper;
        private readonly DBContext _context;
        private readonly AppDbContext _appContext;

        public TransactionService(IMapper mapper, DBContext context, AppDbContext appContext)
        {
            _mapper = mapper;
            _context = context;
            _appContext = appContext;
        }


        public async Task<TransactionResponseDTO> GetTransactions(string userId, TransactionQueryOptions options)
        {

            // Throw error if pageNumber or pageSize is less than 1
            if (options.PageNumber < 1 || options.PageSize < 1)
            {
                throw new Exception("PageNumber and PageSize must be greater than or equal to 1.");
            }

            var transactions = _context.Transactions.AsQueryable();

            if (userId != "")
                transactions = transactions.Where(t => t.UserId == userId || t.Recipient == userId);
            // Filter transactions
            if (options.DateTimeStart == null && options.DateTimeEnd != null) options.DateTimeStart = options.DateTimeEnd;
            if (options.DateTimeEnd == null && options.DateTimeStart != null) options.DateTimeEnd = options.DateTimeStart;

            if (options.DateTimeStart != null && options.DateTimeEnd != null)
            {
                transactions = transactions.Where(t => t.DateTime >= options.DateTimeStart && t.DateTime <= options.DateTimeEnd);
            }

            if (!string.IsNullOrEmpty(options.Recipient))
            {
                transactions = transactions.Where(t => t.Recipient.ToLower() == options.Recipient.ToLower());
            }

            if (options.MinAmount == null && options.MaxAmount != null) options.MinAmount = options.MaxAmount;
            if (options.MaxAmount == null && options.MinAmount != null) options.MaxAmount = options.MinAmount;

            if (options.MinAmount != null && options.MaxAmount != null)
            {
                transactions = transactions.Where(t => t.Amount >= options.MinAmount && t.Amount <= options.MaxAmount);
            }

            if (options.Status != null)
            {
                transactions = transactions.Where(t => t.Status == options.Status);
            }

            // Sort transactions
            if (options.SortingOptions != null)
            {
                if (options.SortingOptions == SortingOptions.Amount)
                    transactions = (options.Ascending == true) ? transactions.OrderBy(t => t.Amount) : transactions.OrderByDescending(t => t.Amount);
                else if (options.SortingOptions == SortingOptions.Recipient)
                    transactions = (options.Ascending == true) ? transactions.OrderBy(t => t.Recipient) : transactions.OrderByDescending(t => t.Recipient);
                else if (options.SortingOptions == SortingOptions.Status)
                    transactions = (options.Ascending == true) ? transactions.OrderBy(t => t.Status) : transactions.OrderByDescending(t => t.Status);
                else
                    transactions = (options.Ascending == true) ? transactions.OrderBy(t => t.DateTime) : transactions.OrderByDescending(t => t.DateTime);
            }

            var response = new TransactionResponseDTO();

            // Set default values for pageNumber and pageSize
            int pageNumber = options.PageNumber ?? 1;
            int pageSize = options.PageSize ?? await transactions.CountAsync();

            // Calculate skip count based on pageNumber and pageSize
            int skipCount = (pageNumber - 1) * pageSize;

            // Apply pagination
            transactions = transactions.Skip(skipCount).Take(pageSize);

            response.Transactions = await transactions.Select(transaction => _mapper.Map<TransactionDTO>(transaction)).ToListAsync();
            response.Pages = (int)Math.Ceiling((double)await transactions.CountAsync() / pageSize);
            response.CurrentPage = pageNumber;

            return response;
        }

        public async Task<TransactionDetailsDTO> GetTransactionByID(int id, string userId)
        {
            var dbTransaction = await _context.Transactions.FirstOrDefaultAsync(transaction => transaction.Id == id);
            if (dbTransaction is null) throw new Exception("No transaction corresponds to the given id.");
            if (dbTransaction.UserId != userId && dbTransaction.Recipient != userId)
            {
                throw new Exception("You don't have Transaction with this ID");
            }
            return _mapper.Map<TransactionDetailsDTO>(dbTransaction);
        }

        public async Task<TransactionDetailsDTO> CreateTransaction(TransactionCreateRequest req)
        {
            var transaction = new Transaction();
            transaction.Account = req.Account;
            transaction.Amount = req.Amount;
            transaction.DateTime = req.DateTime;
            transaction.UserId = req.UserId;
            transaction.Recipient = req.Recipient;
            transaction.Status = req.Status;
            transaction.Type = req.Type;
            _context.Transactions.Add(transaction);
            await _context.SaveChangesAsync();
            return _mapper.Map<TransactionDetailsDTO>(transaction);
        }

        #region TransactionClaim
        public int CreateTransactionClaim(ClaimCreateRequest request, string userId)
        {
            var transactionClaim = new TransactionClaim
            {
                TransactionId = request.TransactionId,
                Subject = request.Subject,
                Description = request.Description,
                Created = DateTime.UtcNow,
                CreatedBy = userId
            };

            _appContext.TransactionClaims.Add(transactionClaim);
            _appContext.SaveChanges();

            //Create bond between contracts and payment terms
            foreach (var documentId in request.DocumentIds)
            {
                var transactionClaimDocument = new TransactionClaimDocument
                {
                    ClaimId = transactionClaim.Id,
                    DocumentId = documentId,
                };
                _appContext.TransactionClaimDocuments.Add(transactionClaimDocument);
            }
            _appContext.SaveChanges();

            return transactionClaim.Id;
        }
        #endregion
    }
}