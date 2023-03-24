namespace AdministrationAPI.Contracts.Requests
{
    public class LoginRequest
    {
        public string EmailPhone { get; set; } //Moze se koristiti regex da se provjeri da li je proslijeđen email ili broj
        public string Password { get; set; }
    }
}
