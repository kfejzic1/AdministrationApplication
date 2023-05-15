using System.Text.Json.Serialization;

namespace AdministrationAPI.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TransactionClaimStatus
    {
        Open = 1,
        Under_Investigation = 2,
        Solved = 3,
        Solved_Confirmed = 4
    }
}