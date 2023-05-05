using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Models
{
    public class User : IdentityUser
    {
        public string? AuthenticatorKey { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string? AccountNumber { get; set; }
        public string? Type { get; set; }

        public EmailActivationCode? EmailActivationCode { get; set; }
        public SMSActivationCode? SMSActivationCode { get; set; }
        public ICollection<Account> Accounts { get; set; }
    }
}
