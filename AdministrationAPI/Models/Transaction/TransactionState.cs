using System.Text.Json.Serialization;

namespace AdministrationAPI.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TransactionState
    {
        Open = 1,
        UnderInvestigation = 2,
        Solved = 3,
        SolvedConfirmed = 4
    }
}