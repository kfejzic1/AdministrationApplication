using System.Text.Json.Serialization;

namespace AdministrationAPI.Models.Transaction
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum SortingOptions
    {
        DateTime = 1,
        Recipient = 2,
        Amount = 3,
        Status = 4
    }
}