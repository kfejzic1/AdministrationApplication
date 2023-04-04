using AdministrationAPI.Models;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Contracts.Requests.Customer
{
    public class CustomerRegisterRequest
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public Roles Role { get; set; }

    }
}
