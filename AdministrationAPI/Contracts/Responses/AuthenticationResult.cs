namespace AdministrationAPI.Contracts.Responses
{
    public class AuthenticationResult
    {
        public string? Token { get; set; }
        public string? Mail { get; set; }
        public bool Success { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public string? UserId { get; set; }
        public IEnumerable<string> Errors { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Username { get; set; }
        public string? Address { get; set; }
        public string? PhoneNumber { get; set; }
    }
}
