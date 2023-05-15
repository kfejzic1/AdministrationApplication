﻿using Mysqlx.Crud;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.EInvoice
{
    public class EInvoice
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string PayerId { get; set; }
        public string PayerName { get; set; }
        public string PayerAdress { get; set; }
        public string Reference { get; set; }
        public string Description { get; set; }
        public string PayeeName { get; set; }
        public int PayeeAccountNumber { get; set; }
        public string PayeeAdress { get; set; }
        public int Amount { get; set; }
        [ForeignKey("Currency")]
        public string CurrencyId { get; set; }
        public Currency Currency { get; set; }
        public bool Paid { get; set; }
        public string Param1 { get; set; }
        public string? Param2 { get; set; }
        public string? Param3 { get; set; }
        public string? Param4 { get; set; }

    }
}
