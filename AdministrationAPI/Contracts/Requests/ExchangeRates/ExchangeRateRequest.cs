using Newtonsoft.Json;
using System.Globalization;

namespace AdministrationAPI.Contracts.Requests.ExchangeRates
{
    public class ExchangeRateRequest
    {
        public string InputCurreny { get; set; }
        public string OutputCurrency { get; set; }
        public double Rate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
