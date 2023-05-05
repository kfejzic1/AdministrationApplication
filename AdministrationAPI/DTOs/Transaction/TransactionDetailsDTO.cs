using AdministrationAPI.Models;

namespace AdministrationAPI.DTOs
{
    public class TransactionDetailsDTO
    {
        public TransactionType Type { get; set; }
        public DateTime DateTime { get; set; }
        public string Recipient { get; set; } = string.Empty;
        public string Account { get; set; } = string.Empty;
        public float Amount { get; set; }
        public TransactionStatus Status { get; set; }
    }
}