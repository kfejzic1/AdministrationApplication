using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models.Vendor;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVendorService
    {
        bool Create(VendorCreateRequest vendorCreateRequest);
        Vendor? Get(int id);
        List<VendorsResponse> GetAll();
        bool Delete(int id);
        bool CreatePOS(POSCreateRequest pOSCreateRequest);
        bool UpdatePOS(int request, POSUpdateRequest updateRequest);
        bool DeletePOS(int id);
        List<POSResponse> GetAllPOS(int id);
        bool CreateLocation(VendorLocationCreateRequest request);
        VendorLocation? GetLocation(int id);
        List<VendorLocationResponse> GetAllLocations();
        List<VendorLocationResponse> GetAllLocationsWithVendorId(int id);
        bool DeleteLocation(VendorLocationDeleteRequest request);
        public bool UpdateLocation(VendorLocationUpdateRequest request);
        public int CreatePaymentTerm(PaymentTermRequest request);
        public List<VendorPaymentTerm> GetAllPaymentTerms();
        public VendorPaymentTerm GetPaymentTerm(int id);
    }
}
