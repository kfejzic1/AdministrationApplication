using AdministrationAPI.Models;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.Contracts.Responses
{
    public class TransactionClaimResponse
    {
        public TransactionClaim Claim { get; set; }
        public List<Document> Documents { get; set; }
        public List<TransactionClaimMessageResponse> Messages { get; set; }
    }
}
