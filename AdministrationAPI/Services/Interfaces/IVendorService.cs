using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models.Vendor;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVendorService
    {
        bool Create(VendorCreateRequest vendorCreateRequest);
        Vendors? Get(int id);
        Vendors? GetByName(string name);
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
        public List<PaymentTermResponse> GetAllPaymentTerms(int vendorId);
        public VendorPaymentTerm GetPaymentTerm(int id);
        public bool UpdatePaymentTerm(PaymentTermRequest paymentTermRequest);
        public bool DeletePaymentTerm(int id);
        public List<InvoiceFrequency> GetInvoiceFrequencies();
        Task<IEnumerable<VendorRoles>> GetVendorUserRoles();

        Task<VendorRoles> GetRoleById(Guid roleId);
        Task<IEnumerable<VendorRoles>> GetRolesForVendorUser(int vendorUserId);

        Task<IEnumerable<VendorUser>> GetVendorUsersForAdmin(int adminId);
        Task<Boolean> IsVendorUserAdmin(int adminId);



    }
}
