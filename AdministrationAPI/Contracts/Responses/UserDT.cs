namespace AdministrationAPI.Contracts.Responses
{
    public class UserDT
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public bool IsTwoFactorEnabled { get; set; }
        public string AuthenticatorKey { get; set; }
    }
}