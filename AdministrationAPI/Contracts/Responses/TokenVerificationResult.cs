namespace AdministrationAPI.Contracts.Responses
{
    public class TokenVerificationResult
    {
        public string Username { get; set; }
        public IEnumerable<string> Roles { get; set; }
        public IEnumerable<string>? Errors { get; set; }

    }
}
