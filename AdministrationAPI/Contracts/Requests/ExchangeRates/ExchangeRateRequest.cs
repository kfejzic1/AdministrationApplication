using Newtonsoft.Json;
using System.Globalization;

namespace AdministrationAPI.Contracts.Requests.ExchangeRates
{
    public class DateOnlyJsonConverter : JsonConverter<DateOnly>
    {
        private const string Format = "yyyy-MM-dd";

        public override DateOnly ReadJson(JsonReader reader,
            Type objectType,
            DateOnly existingValue,
            bool hasExistingValue,
            JsonSerializer serializer) =>
            DateOnly.ParseExact((string)reader.Value, Format, CultureInfo.InvariantCulture);

        public override void WriteJson(JsonWriter writer, DateOnly value, JsonSerializer serializer) =>
            writer.WriteValue(value.ToString(Format, CultureInfo.InvariantCulture));
    }

    public class ExchangeRateRequest
    {
        public string InputCurreny { get; set; }
        public string OutputCurrency { get; set; }
        public double Rate { get; set; }
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly StartDate { get; set; }
        [JsonConverter(typeof(DateOnlyJsonConverter))]
        public DateOnly? EndDate { get; set; }
    }
}
