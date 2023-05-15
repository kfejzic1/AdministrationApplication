using Mysqlx.Crud;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.EInvoice
{
    public class EInvoiceLog
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string PayerName { get; set; }
        public string PayerAddress { get; set; }
        public string Reference { get; set; }
        public string Description { get; set; }
        public string PayeeName { get; set; }
        public int PayeeAccountNumber { get; set; }
        public string PayeeAddress { get; set; }
        public double Amount { get; set; }
        public string CurrencyName { get; set; }
        public string Param1 { get; set; }
        public string? Param2 { get; set; }
        public string? Param3 { get; set; }
        public string? Param4 { get; set; }
        public bool Successful { get; set; }
    }
}
