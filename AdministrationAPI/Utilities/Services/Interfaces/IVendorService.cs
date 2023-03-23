using AdministrationAPI.Contracts.Requests;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVendorService
    {
        bool Create(VendorCreateRequest vendorCreateRequest);
    }
}
