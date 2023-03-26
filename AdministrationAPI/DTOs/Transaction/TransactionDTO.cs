using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdministrationAPI.Models.Transaction;

namespace AdministrationAPI.DTOs
{
    public class TransactionDTO
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public string Recipient { get; set; } = string.Empty;
        public int Amount { get; set; }
        public TransactionStatus Status { get; set; }
    }
}