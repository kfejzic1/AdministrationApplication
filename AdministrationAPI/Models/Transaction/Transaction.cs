namespace AdministrationAPI.Models.Transaction
{
    public class Transaction
    {
        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public DateTime DateTime { get; set; }
        public string Recipient { get; set; } = string.Empty;
        public string Account { get; set; } = string.Empty;
        public float Amount { get; set; }
        public TransactionStatus Status { get; set; }
        public string UserId { get; set; }
    }
}