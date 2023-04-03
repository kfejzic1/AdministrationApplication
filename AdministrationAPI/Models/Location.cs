using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models
{
    public class Location
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)] 
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }
        
        [Required(ErrorMessage = "Address field is required.")]
        public string Address { get; set; }

        public string Phone { get; set; }

        public DateTime? Created { get; set; }

        public int? CreatedBy { get; set; }
        [ForeignKey("Vendor")]
        public int VendorId{get; set;}
        
        public DateTime? Modified { get; set; }
        public int? ModifiedBy { get; set; }

        public Location()
        {
            Name = string.Empty;
            Address = string.Empty;
            Phone = string.Empty;
            CreatedBy = -1;
        }
    }
}
