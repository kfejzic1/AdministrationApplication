using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AdministrationAPI.Contracts.Requests.Users
{
    public class EditRequest
    {
        [Required]
        public string Id { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Role { get; set; }

    }
}
