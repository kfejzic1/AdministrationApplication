﻿using Mysqlx.Crud;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.EInvoiceForms
{
    public class EInvoice
    {

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string PayerName { get; set; }
        public int PayerAccountNumber { get; set; } 
        public string PayerAdress { get; set; }
        public string Reference { get; set; }
        public string PayeeName { get; set; }
        public int PayeeAccountNumber { get; set; }
        public string PayeeAdress { get; set; }
        public int Amount { get; set; }
        public int CurrencyId { get; set; }
        public Currency Currency { get; set; }

    }
}
