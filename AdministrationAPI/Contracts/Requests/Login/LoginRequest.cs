namespace AdministrationAPI.Contracts.Requests
{
    public class LoginRequest
    {
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string Password { get; set; }
    }
}
