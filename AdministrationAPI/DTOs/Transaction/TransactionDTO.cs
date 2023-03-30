using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.DTOs
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public string Recipient { get; set; } = string.Empty;
        public float Amount { get; set; }
        public TransactionStatus Status { get; set; }
    }
}