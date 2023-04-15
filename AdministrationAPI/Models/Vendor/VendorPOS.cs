using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models.Vendor
{
    public class VendorPOS
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        public string Name { get; set; }
        [ForeignKey("Location")]
        public int LocationId { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }

        public VendorPOS()
        {
            Name = string.Empty;
            LocationId = -1;
            CreatedBy = string.Empty;
            ModifiedBy = string.Empty;
        }
    }
}
