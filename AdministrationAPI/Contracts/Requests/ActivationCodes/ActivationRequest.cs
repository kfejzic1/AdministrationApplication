namespace AdministrationAPI.Contracts.Requests;

using System.ComponentModel.DataAnnotations;

public class ActivationRequest
{
    [Required]
    public string Username { get; set; }

    [Required]
    public string Code { get; set; }
}