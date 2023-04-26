namespace AdministrationAPI.Contracts.Requests;


public class RegisterRequest
{
    public string FirstName { get; set; }
    public string LastName { get; set; }    
    public string Email { get; set; }
    public string Username { get; set; } 
    public string Password { get; set; }
    public string Address { get; set; }
    public string PhoneNumber { get; set; }
    public string? Type { get; set; }
}