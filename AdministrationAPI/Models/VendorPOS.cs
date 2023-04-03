using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models
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
        public int? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public int? ModifiedBy { get; set; }

        public VendorPOS()
        {
            Name = string.Empty;
            LocationId=-1;
            CreatedBy = -1;
        }
    }
}
