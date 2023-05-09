using AdministrationAPI.Models;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.Contracts.Responses
{
    public class TransactionClaimMessageDocumentResponse
    {
        public int TransactionClaimMessageDocumentId { get; set; }
        public string FileName { get; set; }
        public string Unc { get; set; }
        public string CreatedBy { get; set; }
    }
}
