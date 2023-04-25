namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class TransactionRequest
    {
        public double Amount { get; set; }
        public string Currency { get; set; }
        public string TransactionType { get; set; }
        public string TransactionPurpose { get; set; }
        public string Category { get; set; }
        public SenderRequest Sender { get; set; }
        public RecipientRequest Recipient { get; set; }
    }
}
