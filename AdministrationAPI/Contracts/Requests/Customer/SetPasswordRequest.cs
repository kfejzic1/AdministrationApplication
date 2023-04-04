namespace AdministrationAPI.Contracts.Requests.Customer
{
    public class SetPasswordRequest
    {
        public string Token { get; set; }
        public int Id { get; set; }
        public string Password { get; set; }

    }
}
