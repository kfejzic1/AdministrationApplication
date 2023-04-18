
namespace AdministrationAPI.DTOs
{
    public class TransactionDTO
    {
        public long transactionId { get; set; }
        public double Amount { get; set; }
        public string Currency { get; set; }
        public string TransactionType { get; set; }
        public string TransactionPurpose { get; set; }
        public string Category { get; set; }

        public DateTime createdAt { get; set; }
        public string recipientId { get; set; }
        public TransactionUser recipient { get; set; }

        public string senderId { get; set; }
        public TransactionUser Sender { get; set; }

    }
}