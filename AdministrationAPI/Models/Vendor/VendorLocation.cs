using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models.Vendor
{
    public class VendorLocation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        [Required(ErrorMessage = "Name field is required.")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Address field is required.")]
        public string Address { get; set; }

        public DateTime? Created { get; set; }

        public string? CreatedBy { get; set; }

        [ForeignKey("Vendor")]
        public int VendorId { get; set; }

        public DateTime? Modified { get; set; }

        public string? ModifiedBy { get; set; }

        public VendorLocation()
        {
            Name = string.Empty;
            Address = string.Empty;
            CreatedBy = string.Empty;
        }
    }
}
