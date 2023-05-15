namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class ExchangeAccountRequest
    {
        public string Currency { get; set; }
        public string BankName { get; set; }
        public string Description { get; set; }
    }
}
