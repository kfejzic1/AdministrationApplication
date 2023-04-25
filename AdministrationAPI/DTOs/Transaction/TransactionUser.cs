namespace AdministrationAPI.DTOs
{
    public class TransactionUser
    {
        public string userId { get; set; }

        public string Name { get; set; } // First name + Last name OR Company name
        public string AccountNumber { get; set; }

        public string phoneNumber { get; set; }

        public string bankName { get; set; }
        public string type { get; set; }
    }
}