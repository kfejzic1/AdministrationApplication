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
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Contracts.Responses;

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

        public async Task<TransactionDTO> GetTransactionByID(int id, string token)
        {
            var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Transaction/GetTransactionByID?token=" + token + "&transactionId=" + id);
            if (response.IsSuccessStatusCode)
            {
                var transactions = await response.Content.ReadFromJsonAsync<TransactionDTO>();
                if (transactions == null)
                {
                    throw new Exception("No transactions found.");
                }
                return transactions;
            }
            throw new AuthenticationException("Invalid token!");
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
                CreatedBy = userId,
                Status = TransactionClaimStatus.Open,
            };

            _appContext.TransactionClaims.Add(transactionClaim);
            _appContext.SaveChanges();

            var transactionClaimUser = new TransactionClaimUser
            {
                TransactionClaimId = transactionClaim.Id,
                UserId = userId
            };

            _appContext.TransactionClaimUsers.Add(transactionClaimUser);
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

        public List<TransactionClaim> GetTransactionClaims(string userId)
        {
            var userClaimsId = _appContext.TransactionClaimUsers.Where(claimUser => claimUser.UserId == userId).Select(claimUser => claimUser.TransactionClaimId).ToList();
            var userTransactionClaims = _appContext.TransactionClaims.Where(trc => userClaimsId.Contains(trc.Id)).ToList();
            return userTransactionClaims;
        }

        public int CreateTransactionClaimMessage(ClaimMessageCreateRequest request, string userId)
        {
            var transactionClaimMessage = new TransactionClaimMessage
            {
                TransactionClaimId = request.TransactionClaimId,
                UserId = userId,
                Message = request.Message
            };

            _appContext.TransactionClaimMessages.Add(transactionClaimMessage);
            _appContext.SaveChanges();

            foreach (var documentId in request.DocumentIds)
            {
                var claimMessagesDocument = new ClaimsMessagesDocuments
                {
                    MessageId = transactionClaimMessage.Id,
                    DocumentId = documentId,
                };
                _appContext.ClaimsMessagesDocuments.Add(claimMessagesDocument);
            }
            _appContext.SaveChanges();
            return transactionClaimMessage.Id;
        }

        public TransactionClaimResponse GetTransactionClaim(int id)
        {
            var transactionClaim = _appContext.TransactionClaims.First(trc => trc.Id == id);
            var transactionClaimDocumentsIds = _appContext.TransactionClaimDocuments.Where(trcd => trcd.ClaimId == id).Select(doc => doc.DocumentId).ToList();
            var transactionClaimDocuments = _appContext.Documents.Where(doc => transactionClaimDocumentsIds.Contains(doc.Id)).ToList();
            var transactionClaimMessages = _appContext.TransactionClaimMessages.Where(trcm => trcm.TransactionClaimId == id).ToList();
            List<TransactionClaimMessageResponse> messageReponses = new List<TransactionClaimMessageResponse>();
            foreach (var message in transactionClaimMessages)
            {
                var documentIds = _appContext.ClaimsMessagesDocuments.Where(cmd => cmd.MessageId == message.Id).Select(doc => doc.DocumentId).ToList();
                var msgResp = new TransactionClaimMessageResponse
                {
                    TransactionClaimId = message.TransactionClaimId,
                    UserId = message.UserId,
                    Message = message.Message,
                    UserName = _appContext.Users.First(user => user.Id == message.UserId).NormalizedUserName,
                    Documents = _appContext.Documents.Where(doc => documentIds.Contains(doc.Id)).ToList()
                };
                messageReponses.Add(msgResp);
            }
            var transactionClaimResponse = new TransactionClaimResponse
            {
                Claim = transactionClaim,
                Documents = transactionClaimDocuments,
                Messages = messageReponses
            };
            return transactionClaimResponse;
        }


        public string AcceptTransactionClaim(ClaimAcceptRequest request, string userId)
        {
            var transactionClaimUser = _appContext.TransactionClaimUsers.FirstOrDefault(tc => tc.TransactionClaimId == request.TransactionClaimId);
            transactionClaimUser.AdminId = userId;

            _appContext.SaveChanges();

            var transactionClaim = _appContext.TransactionClaims.FirstOrDefault(tc => tc.Id == request.TransactionClaimId);
            transactionClaim.Status = TransactionClaimStatus.Under_Investigation;
            _appContext.SaveChanges();

            return transactionClaim.Status.ToString();
        }

        public TransactionClaim UpdateTransactionClaim(ClaimUpdateRequest request, string userId)
        {
            var transactionClaim = _appContext.TransactionClaims.FirstOrDefault(tc => tc.Id == request.TransactionClaimId);
            transactionClaim.Status = request.ClaimStatus;
            _appContext.SaveChanges();

            return transactionClaim;
        }

        public List<TransactionClaim> GetTransactionClaimsForAdmin(string userId)
        {
            var adminClaimsId = _appContext.TransactionClaimUsers.Where(claimAdmin => claimAdmin.AdminId == userId).Select(claimAdmin => claimAdmin.TransactionClaimId).ToList();
            var transactionClaims = _appContext.TransactionClaims.Where(trc => adminClaimsId.Contains(trc.Id)).ToList();

            return transactionClaims;
        }

        public List<TransactionClaim> GetTransactionClaimsOpen(string userId)
        {
            var adminClaimsId = _appContext.TransactionClaimUsers.Where(claimAdmin => claimAdmin.AdminId == userId).Select(claimAdmin => claimAdmin.TransactionClaimId).ToList();
            var transactionClaims = _appContext.TransactionClaims.Where(trc => !adminClaimsId.Contains(trc.Id)).ToList();

            return transactionClaims;
        }



    }
}
