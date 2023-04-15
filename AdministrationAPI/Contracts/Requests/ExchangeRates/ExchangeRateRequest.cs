namespace AdministrationAPI.Contracts.Requests.ExchangeRates
{
    public class ExchangeRateRequest
    {
        public string InputCurreny { get; set; }
        public string OutputCurrency { get; set; }
        public double Rate { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}
