namespace AdministrationAPI.Contracts.Requests.EInvoices
{
    public class EInvoiceCreateRequest
    {
        public string PayerName { get; set; }
        public string PayerAdress { get; set; }
        public string Reference { get; set; }
        public string Description { get; set; }
        public string PayeeName { get; set; }
        public int PayeeAccountNumber { get; set; }
        public string PayeeAdress { get; set; }
        public int Amount { get; set; }
        public string CurrencyId { get; set; }
        public string Param1 { get; set; }
        public string? Param2 { get; set; }
        public string? Param3 { get; set; }
        public string? Param4 { get; set; }
    }
}
