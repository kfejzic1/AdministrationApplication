using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Models
{
    public class User : IdentityUser
    {
        public string? AuthenticatorKey { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }

        public ActivationCode ActivationCode { get; set; }

    }
}
