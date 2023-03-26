using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Models
{
    [Index(nameof(Email), IsUnique = true)] //Razliciti useri ne mogu imati racun sa istim mailom.
    public class User
    {
        public int Id { get; set; }

        public int Vendor_Id { get; set; }

        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email field is required.")]
        [EmailAddress]
        public string Email { get; set; }

        public bool EmailConfirmed { get; set; } = false;

        [Required(ErrorMessage = "Password field is required.")]
        public string Password { get; set; }

        [Required(ErrorMessage = "Phone field is required.")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Created field is required.")]
        public DateTime? Created { get; set; }

        [Required(ErrorMessage = "CreatedBy field is required.")]
        public int CreatedBy { get; set; }

        public DateTime? Modified { get; set; }
        public int? ModifiedBy { get; set; }


        public User()
        {
            Id = -1;
            Vendor_Id = -1;
            Name = string.Empty;
            Email = string.Empty;
            EmailConfirmed = false;
            Password = string.Empty;
            Phone = string.Empty;
        }

    }
}
