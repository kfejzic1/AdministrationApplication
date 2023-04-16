namespace AdministrationAPI.Contracts.Responses
{
    public class ExchangeRateRepsonse
    {
        public string InputCurrency { get; set; }
        public string OutputCurrency { get; set; }
        public double Rate { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly? EndDate { get; set; }
    }
}
