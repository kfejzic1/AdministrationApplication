using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models
{
    public class VendorUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public int VendorId { get; set; }
        public int UserId { get; set; }

        public VendorUser()
        {}
    }
}
