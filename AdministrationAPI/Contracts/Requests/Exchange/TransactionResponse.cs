namespace AdministrationAPI.Contracts.Requests.Exchange
{

    public class TransactionResponse
    {
        public int TransactionId { get; set; }
        public double Amount { get; set; }
        public string Currency { get; set; }
        public string TransactionType { get; set; } // Possible values: C2C, B2B, C2B
        public string TransactionPurpose { get; set; }
        public string Category { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserWithAccount Sender { get; set; }
        public UserWithAccount Recipient { get; set; }
    }
}
