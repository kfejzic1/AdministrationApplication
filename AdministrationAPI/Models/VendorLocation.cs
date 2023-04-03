using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models
{
    public class VendorLocation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)] 
        public int Id { get; set; }
        
        [Required(ErrorMessage = "Address field is required.")]
        public string Address { get; set; }

        public DateTime? Created { get; set; }

        public int? CreatedBy { get; set; }

        [ForeignKey("Vendor")]
        public int VendorId{get; set;}
        
        public DateTime? Modified { get; set; }

        public int? ModifiedBy { get; set; }

        public VendorLocation()
        {
            Address = string.Empty;
            CreatedBy = -1;
        }
    }
}
