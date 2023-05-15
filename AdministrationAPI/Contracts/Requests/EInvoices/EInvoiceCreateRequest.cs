namespace AdministrationAPI.Contracts.Requests.EInvoices
{
    public class EInvoiceCreateRequest
    {
        public string PayerName { get; set; }
        public string PayerAddress { get; set; }
        public string Reference { get; set; }
        public string Description { get; set; }
        public string PayeeName { get; set; }
        public string PayeeAccountNumber { get; set; }
        public string PayeeAddress { get; set; }
        public double Amount { get; set; }
        public string CurrencyName { get; set; }
        public string Param1 { get; set; }
        public string? Param2 { get; set; }
        public string? Param3 { get; set; }
        public string? Param4 { get; set; }
    }
}
