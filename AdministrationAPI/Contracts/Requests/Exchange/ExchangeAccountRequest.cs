namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class ExchangeAccountRequest
    {
        public string currency { get; set; }
        public string bankName { get; set; }
        public string Description { get; set; }
    }
}
