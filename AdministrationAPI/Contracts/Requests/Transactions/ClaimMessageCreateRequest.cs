namespace AdministrationAPI.Contracts.Requests.Transactions
{
    public class ClaimMessageCreateRequest
    {
        public int TransactionClaimId { get; set; }
        public string Message { get; set; }
        public List<int> DocumentIds { get; set; }

        public ClaimMessageCreateRequest()
        {
            DocumentIds = new List<int>();
        }
    }
}
