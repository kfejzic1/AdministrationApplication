using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVendorService
    {
        bool Create(VendorCreateRequest vendorCreateRequest);
        Vendor? Get(int id);
        List<VendorsResponse> GetAll();
        bool Delete(int id);
    }
}
