using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Services.Interfaces;

namespace AdministrationAPI.Services
{
    public class VendorService : IVendorService
    {
        public VendorService() { }

        public bool Create(VendorCreateRequest request)
        {
            return true;
        }
    }
}
