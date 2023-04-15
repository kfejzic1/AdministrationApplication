namespace AdministrationAPI.Models;

public class TokenValidity
{
    public Guid Id { get; set; }
    public string Token { get; set; }
    public bool IsValid { get; set; }
}
