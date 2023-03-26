using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models
{
    public class Vendor
    {
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "Address field is required.")]
        public string Address { get; set; }
        public string CompanyDetails { get; set; }

        [Required(ErrorMessage = "Phone field is required.")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Created field is required.")]
        public DateTime? Created { get; set; }

        [Required(ErrorMessage = "CreatedBy field is required.")]
        public int CreatedBy { get; set; }
        
        public DateTime? Modified { get; set; }
        public int? ModifiedBy { get; set; }

        public Vendor()
        {
            Id = -1;
            Name = string.Empty;
            Address = string.Empty;
            CompanyDetails = string.Empty;
            Phone = string.Empty;
        }
    }
}
