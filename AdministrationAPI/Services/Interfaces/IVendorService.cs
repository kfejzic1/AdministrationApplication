using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVendorService
    {
        bool Create(VendorCreateRequest vendorCreateRequest);
        Vendor? Get(int id);
        List<Vendor> GetAll();
        bool Delete(int id);
    }
}
