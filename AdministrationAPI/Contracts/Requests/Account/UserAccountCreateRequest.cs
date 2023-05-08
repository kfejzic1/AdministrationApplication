using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Contracts.Requests.Users
{
    public class AccountCreationRequestCreateRequest
    {
        public string CurrencyId { get; set; }
        public string Description { get; set; }
        public string? RequestDocumentPath { get; set; }
        public string? UserId { get; set; }
    }
}
