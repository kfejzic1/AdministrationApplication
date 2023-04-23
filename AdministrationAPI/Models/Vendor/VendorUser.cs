using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models.Vendor
{
    public class VendorUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public int VendorId { get; set; }
        public string UserId { get; set; }

        public ICollection<VendorUserRole> Roles { get; set; }

        public VendorUser()
        { }
    }
}
