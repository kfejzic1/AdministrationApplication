using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AdministrationAPI.Models.Transaction
{
    public class TransactionQueryOptions
    {
        public DateTime? DateTimeStart { get; set; }
        public DateTime? DateTimeEnd { get; set; }
        public string? Recipient { get; set; }
        public TransactionStatus? Status { get; set; }
        public SortingOptions? SortingOptions { get; set; }
        public bool? Ascending { get; set; }
        public int? PageNumber { get; set; }
        public int? PageSize { get; set; }
        public float? MinAmount { get; set; }
        public float? MaxAmount { get; set; }
    }
}