using AdministrationAPI.Data;
using AdministrationAPI.DTOs;
using AdministrationAPI.Contracts.Requests;
using AutoMapper;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using AdministrationAPI.Models.Transaction;
using System.Security.Authentication;
using AdministrationAPI.Contracts.Requests.Transactions;
using System.Globalization;

namespace AdministrationAPI.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly IMapper _mapper;
        private readonly DBContext _context;
        private readonly AppDbContext _appContext;

        static HttpClient client = new HttpClient();

        public TransactionService(IMapper mapper, DBContext context, AppDbContext appContext)
        {
            _mapper = mapper;
            _context = context;
            _appContext = appContext;
        }


        public async Task<List<TransactionDTO>> GetTransactions(string token, TransactionQueryOptions options)
        {
            string query = "?token=" + token;
            query += (options.PageNumber != null) ? "&PageNumber=" + options.PageNumber.ToString() : "";
            query += (options.PageSize != null) ? "&PageSize=" + options.PageSize.ToString() : "";
            query += (options.AmountStartFilter != null) ? "&AmountStartFilter=" + options.AmountStartFilter : "";
            query += (options.AmountEndFilter != null) ? "&AmountEndFilter=" + options.AmountEndFilter : "";
            query += (options.CurrencyFilter != null) ? "&CurrencyFilter=" + options.CurrencyFilter : "";
            query += (options.TransactionTypeFilter != null) ? "&TransactionTypeFilter=" + options.TransactionTypeFilter : "";
            query += (options.RecipientNameFilter != null) ? "&RecipientNameFilter=" + options.RecipientNameFilter : "";
            query += (options.RecipientAccountNumberFilter != null) ? "&recipientAccountNumberFilter=" + options.RecipientAccountNumberFilter : "";
            query += (options.SenderNameFilter != null) ? "&SenderNameFilter=" + options.SenderNameFilter : "";
            if (options.DateTimeStart != null)
            {
                DateTime start = options.DateTimeStart ?? DateTime.Now;
                query += "&CreatedAtStartFilter=" + start.ToString("s");
            }
            if (options.DateTimeEnd != null)
            {
                DateTime end = options.DateTimeEnd ?? DateTime.Now;
                query += "&CreatedAtStartFilter=" + end.ToString("s");
            }
            query += (options.sortOrder != null) ? "&sortingOrder=" + options.sortOrder : "";

            var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Transaction/GetTransactionsForUser" + query);
            var trans = await response.Content.ReadAsAsync<List<TransactionDTO>>();
            return trans;
        }
        public async Task<List<TransactionTransfer>> GetGroupedTransactionsByType(string token)
        {
            var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Transaction/GroupTransactionsByType?token=" + token);
            if (response.IsSuccessStatusCode)
            {
                var transactions = await response.Content.ReadFromJsonAsync<List<TransactionTransfer>>();
                if (transactions == null)
                {
                    throw new Exception("No transactions found.");
                }
                return transactions;
            }
            throw new AuthenticationException("Invalid token!");
        }

        public async Task<List<TransactionTransfer>> GetGroupedTransactionsByCurrency(string token)
        {
            var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Transaction/GroupTransactionsByCurrency?token=" + token);
            if (response.IsSuccessStatusCode)
            {
                var transactions = await response.Content.ReadFromJsonAsync<List<TransactionTransfer>>();
                if (transactions == null)
                {
                    throw new Exception("No transactions found.");
                }
                return transactions;
            }
            throw new AuthenticationException("Invalid token!");
        }

        public Task<TransactionDetailsDTO> GetTransactionByID(int id, string token)
        {
            throw new NotImplementedException();
        }

        public Task<TransactionDetailsDTO> CreateTransaction(TransactionCreateRequest req)
        {
            throw new NotImplementedException();
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
