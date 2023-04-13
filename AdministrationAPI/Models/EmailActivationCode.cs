namespace AdministrationAPI.Models;

public class EmailActivationCode
{
    public string Id { get; set; }
    public string Code { get; set; }

    public string UserId { get; set; }
    public User User { get; set; }
}
