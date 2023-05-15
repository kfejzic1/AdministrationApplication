namespace AdministrationAPI.Contracts.Responses
{
    public class TransactionClaimMessageDocumentResponse
    {
        public int TransactionClaimId { get; set; }
        public string Message { get; set; }
        public string UserId { get; set; }
        public string UserName { get; set; }
        public List<Document> Documents { get; set; }
    }
}