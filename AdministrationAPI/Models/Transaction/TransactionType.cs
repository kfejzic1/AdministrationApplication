using System.Text.Json.Serialization;

namespace AdministrationAPI.Models
{
  [JsonConverter(typeof(JsonStringEnumConverter))]
  public enum TransactionType
  {
    Purchase = 1,
    Payment = 2,
    Receipt = 3,
    Sale = 4
  }
}