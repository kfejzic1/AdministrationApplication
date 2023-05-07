using AdministrationAPI.Models;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.Contracts.Responses
{
    public class TransactionClaimMessageResponse
    {
        public int TransactionClaimId { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public List<Document> Documents { get; set; }
    }
}
