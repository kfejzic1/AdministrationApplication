namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class ExchangeTransactionRequest
    {
        public double Amount { get; set; }
        public string TransactionPurpose { get; set; }
        public string SenderCurrency { get; set; }
        public string RecipientCurrnecy { get; set; }
    }
}
