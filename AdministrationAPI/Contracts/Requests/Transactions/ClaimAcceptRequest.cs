namespace AdministrationAPI.Contracts.Requests.Transactions


{
    public class ClaimAcceptRequest
    {
        public int TransactionClaimId { get; set; }
        public string AdminId { get; set; }

        public ClaimAcceptRequest()
        {
            AdminId = string.Empty;
        }
    }
}
