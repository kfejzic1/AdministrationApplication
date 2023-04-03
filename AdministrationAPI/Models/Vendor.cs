using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models
{
    public class Vendor
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)] 
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "Address field is required.")]
        public string Address { get; set; }
        public string CompanyDetails { get; set; }

        public string Phone { get; set; }

        public DateTime? Created { get; set; }

        public string? CreatedBy { get; set; }
        
        public DateTime? Modified { get; set; }
        public int? ModifiedBy { get; set; }

        public Vendor()
        {
            Name = string.Empty;
            Address = string.Empty;
            CompanyDetails = string.Empty;
            Phone = string.Empty;
            CreatedBy = string.Empty;
        }
    }
}
