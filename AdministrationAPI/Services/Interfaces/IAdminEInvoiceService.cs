using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.EInvoiceRegistration;
using AdministrationAPI.Models;
using AdministrationAPI.Models.EInvoiceForms;

using AdministrationAPI.Models.Vendor;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IAdminEInvoiceService
    {
        public Task<List<EInvoiceRequest>> GetAllInvoiceRequests();

        public Task<List<EInvoiceRequest>> GetInvoiceRequestsByID(int b2bID);

        public Task<EInvoiceRequest> HandleRequestStatus(bool approve, int requestID);

    public Task<Vendors> DefineRequiredDataForVendor(int vendorId, RequiredData data);

    public Task<EInvoiceRequest> AddEInvoiceRequest(EInvoiceRegistrationData eInvoiceRegistrationData, string userId);

    }

}