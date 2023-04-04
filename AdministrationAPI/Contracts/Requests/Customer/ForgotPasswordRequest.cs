using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Contracts.Requests.Customer
{
    public class ForgotPasswordRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
