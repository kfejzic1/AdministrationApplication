using System.Text.Json.Serialization;

namespace AdministrationAPI.Models.Transaction
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TransactionStatus
    {
        Pending = 1,
        Processing = 2,
        Success = 3,
        Failure = 4
    }
}