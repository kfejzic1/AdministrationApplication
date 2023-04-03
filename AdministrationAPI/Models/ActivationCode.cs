namespace AdministrationAPI.Models;

public class ActivationCode
{
    public Guid Id { get; set; }
    public string EmailCode { get; set; }
    public string SMSCode { get; set; }
      
    public string UserId { get; set; }
    public User User { get; set; }   
    public bool ActivatedEmail { get; set; }
    public bool ActivatedSMS { get; set; }
}
