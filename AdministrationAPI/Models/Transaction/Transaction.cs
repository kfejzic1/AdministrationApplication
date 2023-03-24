using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdministrationAPI.Models.Transaction
{
    public class Transaction
    {
        public int Id { get; set; }
        public TransactionType Type { get; set; }
        public DateTime DateTime { get; set; }
        public string Recipient { get; set; } = string.Empty;
        public string Account { get; set; } = string.Empty;
        public int Amount { get; set; }
        public TransactionStatus Status { get; set; }
    }
}