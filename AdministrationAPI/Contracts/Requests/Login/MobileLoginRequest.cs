using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Contracts.Requests
{
    public class MobileLoginRequest
    {
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string Password { get; set; }
        [RegularExpression("email|sms", ErrorMessage = "Method can only be `email` or `sms`")]
        public string Method { get; set; }
    }
}
