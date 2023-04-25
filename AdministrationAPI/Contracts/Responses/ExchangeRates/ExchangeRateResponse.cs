namespace AdministrationAPI.Contracts.Responses
{
    public class ExchangeRateRepsonse
    {
        public string Id { get; set; }
        public string InputCurrency { get; set; }
        public string OutputCurrency { get; set; }
        public double Rate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
