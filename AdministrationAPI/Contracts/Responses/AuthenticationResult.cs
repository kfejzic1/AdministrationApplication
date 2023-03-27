using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Responses
{
    public class AuthenticationResult
    {
        public string? Token { get; set; }
        public bool Success { get; set; }
        public bool IsTwoFactorEnabled { get; set; }
        public Message? EmailMessage { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}
