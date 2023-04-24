namespace AdministrationAPI.Contracts.Requests.Exchange
{
    public class RecipientRequest
    {
        public string Name { get; set; } // First name + Last name OR Company name
        public string AccountNumber { get; set; }

    }
}
