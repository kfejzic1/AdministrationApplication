namespace AdministrationAPI.Contracts.Requests.Transactions
{
    public class ClaimCreateRequest
    {
        public int TransactionId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public List<int> DocumentIds { get; set; }

        public ClaimCreateRequest() 
        {
            DocumentIds = new List<int>();
        }
    }
}
