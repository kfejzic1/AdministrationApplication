using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Models.Vendor
{

    public class VendorUserRole 
    {
        public int Id { get; set; }
        public int VendorUserId { get; set; }
        public int RoleId { get; set; }
    }
}
