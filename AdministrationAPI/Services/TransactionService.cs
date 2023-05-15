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
        private readonly AppDbContext _appDbContext;

        static HttpClient client = new HttpClient();

        public TransactionService(IMapper mapper, DBContext context, AppDbContext appContext)
        {
            _mapper = mapper;
            _context = context;
            _appDbContext = appContext;
        }

        public TransactionClaimMessageDocumentResponse GetDocument(int id)
        {
           var doc= _appDbContext.Documents.FirstOrDefault(d => d.Id == id);
            return new TransactionClaimMessageDocumentResponse
            {
                CreatedBy = doc.CreatedBy,
                FileName= doc.FileName,
                TransactionClaimMessageDocumentId=doc.Id,
                Unc=doc.UNC

            };
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

            _appDbContext.TransactionClaims.Add(transactionClaim);
            _appDbContext.SaveChanges();

            var transactionClaimUser = new TransactionClaimUser
            {
                TransactionClaimId = transactionClaim.Id,
                UserId = userId
            };

            _appDbContext.TransactionClaimUsers.Add(transactionClaimUser);
            _appDbContext.SaveChanges();


            //Create bond between contracts and payment terms
            foreach (var documentId in request.DocumentIds)
            {
                var transactionClaimDocument = new TransactionClaimDocument
                {
                    ClaimId = transactionClaim.Id,
                    DocumentId = documentId,
                };
                _appDbContext.TransactionClaimDocuments.Add(transactionClaimDocument);
            }
            _appDbContext.SaveChanges();

            return transactionClaim.Id;
        }


        #endregion

        public List<TransactionClaim> GetTransactionClaims(string userId)
        {
            var userClaimsId = _appDbContext.TransactionClaimUsers.Where(claimUser => claimUser.UserId == userId).Select(claimUser => claimUser.TransactionClaimId).ToList();
            var userTransactionClaims = _appDbContext.TransactionClaims.Where(trc => userClaimsId.Contains(trc.Id)).ToList();
            return userTransactionClaims;
        }

        public int CreateTransactionClaimMessage(ClaimMessageCreateRequest request, string userId)
        {
            var transactionClaimUser = _appDbContext.TransactionClaimUsers.FirstOrDefault(tc => tc.TransactionClaimId == request.TransactionClaimId);
            //check validity of the request + authorization
            if (transactionClaimUser == default(TransactionClaimUser))
                throw new Exception("The specified transaction claim does not exist.");

            if (transactionClaimUser.UserId != userId && transactionClaimUser.AdminId != userId)
                throw new Exception("No permission to add messages to the specified claim.");

            var transactionClaimMessage = new TransactionClaimMessage
            {
                TransactionClaimId = request.TransactionClaimId,
                UserId = userId,
                Message = request.Message
            };

            _appDbContext.TransactionClaimMessages.Add(transactionClaimMessage);
            _appDbContext.SaveChanges();

            foreach (var documentId in request.DocumentIds)
            {
                var claimMessagesDocument = new ClaimsMessagesDocuments
                {
                    MessageId = transactionClaimMessage.Id,
                    DocumentId = documentId,
                };
                _appDbContext.ClaimsMessagesDocuments.Add(claimMessagesDocument);
            }
            _appDbContext.SaveChanges();
            return transactionClaimMessage.Id;
        }

        public TransactionClaimResponse GetTransactionClaim(int id)
        {

            var transactionClaim = _appDbContext.TransactionClaims.First(trc => trc.Id == id);
            var transactionClaimDocumentsIds = _appDbContext.TransactionClaimDocuments.Where(trcd => trcd.ClaimId == id).Select(doc => doc.DocumentId).ToList();
            var transactionClaimDocuments = _appDbContext.Documents.Where(doc => transactionClaimDocumentsIds.Contains(doc.Id)).ToList();
            var transactionClaimMessages = _appDbContext.TransactionClaimMessages.Where(trcm => trcm.TransactionClaimId == id).ToList();
            List<TransactionClaimMessageResponse> messageReponses = new List<TransactionClaimMessageResponse>();
            foreach (var message in transactionClaimMessages)
            {
                var documentIds = _appDbContext.ClaimsMessagesDocuments.Where(cmd => cmd.MessageId == message.Id).Select(doc => doc.DocumentId).ToList();
                var msgResp = new TransactionClaimMessageResponse
                {
                    TransactionClaimId = message.TransactionClaimId,
                    UserId = message.UserId,
                    Message = message.Message,
                    UserName = _appDbContext.Users.First(user => user.Id == message.UserId).NormalizedUserName,
                    Documents = _appDbContext.Documents.Where(doc => documentIds.Contains(doc.Id)).ToList()
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
            var transactionClaim = _appDbContext.TransactionClaims.FirstOrDefault(tc => tc.Id == request.TransactionClaimId);
            Console.WriteLine(transactionClaim);
            if (transactionClaim == null)
                throw new Exception("The specified transaction claim does not exist.");

            var transactionClaimUser = _appDbContext.TransactionClaimUsers.FirstOrDefault(t => t.TransactionClaimId == transactionClaim.Id);

            if (transactionClaimUser == default(TransactionClaimUser))
                throw new Exception("Ovaj claim je kreiran prije implementacije sprinta 6.");

            if (transactionClaimUser.AdminId != string.Empty)
                throw new Exception("The specified transaction claim is not open.");

            transactionClaimUser.AdminId = userId;

            _appDbContext.SaveChanges();

            transactionClaim.Status = TransactionClaimStatus.Under_Investigation;
            _appDbContext.SaveChanges();

            return transactionClaim.Status.ToString();
        }

        public TransactionClaim? UpdateTransactionClaim(ClaimUpdateRequest request, string userId)
        {


            var transactionClaim = _appDbContext.TransactionClaims.FirstOrDefault(tc => tc.Id == request.TransactionClaimId);
            if (transactionClaim == default(TransactionClaim))
                throw new Exception("The specified transaction claim does not exist.");

            var transactionClaimUser = _appDbContext.TransactionClaimUsers.FirstOrDefault(t => t.TransactionClaimId == transactionClaim.Id);

            if (transactionClaimUser == default(TransactionClaimUser))
                throw new Exception("Ovaj claim je kreiran prije implementacije sprinta 6.");

            if (transactionClaimUser.AdminId != userId)
                throw new Exception("Permission denied to modify specified transaction.");

            bool status_ok = true;

            var currentStatus = transactionClaim.Status;
            var newStatus = request.ClaimStatus;

            if (newStatus == currentStatus)
                return transactionClaim;


            if (currentStatus == TransactionClaimStatus.Open || currentStatus == TransactionClaimStatus.Solved_Confirmed)
                status_ok = false;
            else if (newStatus == TransactionClaimStatus.Open)
                status_ok = false;
            else if (currentStatus == TransactionClaimStatus.Under_Investigation && newStatus != TransactionClaimStatus.Solved)
                status_ok = false;

            if (!status_ok)
                throw new Exception("Illegal status value.");

            transactionClaim.Status = newStatus;
            _appDbContext.SaveChanges();

            return transactionClaim;
        }

        public List<TransactionClaim> GetTransactionClaimsForAdmin(string userId)
        {
            var adminClaimsId = _appDbContext.TransactionClaimUsers.Where(claimAdmin => claimAdmin.AdminId == userId).Select(claimAdmin => claimAdmin.TransactionClaimId).ToList();
            var transactionClaims = _appDbContext.TransactionClaims.Where(trc => adminClaimsId.Contains(trc.Id)).ToList();

            return transactionClaims;
        }

        public List<TransactionClaim> GetTransactionClaimsOpen()
        {
            var transactionClaims = _appDbContext.TransactionClaims.Where(trc => trc.Status == TransactionClaimStatus.Open).ToList();

            return transactionClaims;
        }



    }
}
