using System.Text.Json.Serialization;

namespace AdministrationAPI.Models
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