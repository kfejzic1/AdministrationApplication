namespace AdministrationAPI.Contracts.Requests;

using System.ComponentModel.DataAnnotations;

public class OTCActivationRequest
{
    public string? Email { get; set; }
    public string? Phone { get; set; }

    [Required]
    public string Code { get; set; }
    [Required]
    [RegularExpression("email|sms", ErrorMessage = "Method can only be `email` or `sms`")]
    public string Method { get; set; }
}