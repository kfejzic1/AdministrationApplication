namespace AdministrationAPI.Contracts.Requests
{
    public class Login2FARequest
    {
        public string Code { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
    }
}
