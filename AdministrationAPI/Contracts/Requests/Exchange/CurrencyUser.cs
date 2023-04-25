namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class CurrencyUser
    {
        public string UserId { get; set; }
        public string Name { get; set; } // First name + Last name OR Company name
        public string Type { get; set; } // Possible values: Person, Company
        public string PhoneNumber { get; set; }
    }
}
