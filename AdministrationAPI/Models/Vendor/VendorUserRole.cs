using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Models.Vendor
{

    public class VendorUserRole : IdentityRole<Guid>
    {

        public VendorUserRole() : base()
        {
        }

        public VendorUserRole(string roleName) : base(roleName)
        {
        }

    }

}
