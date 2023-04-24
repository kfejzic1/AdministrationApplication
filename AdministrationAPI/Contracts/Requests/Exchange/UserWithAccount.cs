namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class UserWithAccount
    {
        public string Name { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string PhoneNumber { get; set; }
        public string Type { get; set; }
    }
}
