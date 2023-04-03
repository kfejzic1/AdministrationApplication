namespace AdministrationAPI.Contracts.Requests;

using System.ComponentModel.DataAnnotations;

public class SMSInformationRequest
{
    //only username is necessary, from it we can find activation codes and user's Id
    [Required]
    public string Username { get; set; }
}