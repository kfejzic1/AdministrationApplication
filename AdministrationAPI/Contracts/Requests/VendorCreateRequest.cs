using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Requests
{
    public class VendorCreateRequest : Vendor
    {
        List<string> AssignedUserIds { get; set; }
    }
}
