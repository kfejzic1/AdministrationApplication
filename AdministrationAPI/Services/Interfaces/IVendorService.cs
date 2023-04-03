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
    public interface IVendorPOSService{
        bool Create(POSCreateRequest pOSCreateRequest);
        bool Update( int request,POSUpdateRequest updateRequest);
        bool Delete(int id);
        List<POSResponse> GetAll(int id);

    }
    public interface IVendorLocationService
    {
        bool Create(VendorLocationCreateRequest request);
        VendorLocation? Get(int id);
        List<VendorLocationResponse> GetAll();
        List<VendorLocationResponse> GetAllWithVendorId(int id);
        bool Delete(VendorLocationDeleteRequest request);
        public bool Update(VendorLocationUpdateRequest request);
    }
}
