using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Contracts.Requests.Users
{
    public class UserAccountCreateRequest
    {
        public string AccountNumber { get; set; }
        public string CurrencyId { get; set; }
        public string Description { get; set; }
        public string RequestDocumentPath { get; set; }
        public bool Approved { get; set; }
        public string UserId { get; set; }
    }
}
