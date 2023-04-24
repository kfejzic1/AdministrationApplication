using AdministrationAPI.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class CurrencyAccount
    {
        public int AccountId { get; set; }
        public string AccountNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Currency { get; set; }
        public string BankName { get; set; }
        public double Credit { get; set; }
        public double Debit { get; set; }
        public double Total { get; set; }

        public string OwnerId { get; set; }
        public CurrencyUser Owner { get; set; }
    }
}
