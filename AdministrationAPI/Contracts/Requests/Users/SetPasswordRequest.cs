namespace AdministrationAPI.Contracts.Requests.Users
{
    public class SetPasswordRequest
    {
        public string Token { get; set; }
        public string Id { get; set; }
        public string Password { get; set; }
    }
}
