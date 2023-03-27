namespace AdministrationAPI.Contracts.Requests
{
    public class Login2FARequest
    {
        public string Code { get; set; }
        public string Email { get; set; }
    }
}
