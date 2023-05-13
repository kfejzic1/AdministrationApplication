using AdministrationAPI.Models.Vendor;

namespace AdministrationAPI.Services.Interfaces
{
  public interface IAdminEInvoiceService
  {
    public Task<List<EInvoiceRequest>> GetAllInvoiceRequests();

    public Task<List<EInvoiceRequest>> GetInvoiceRequestsByID(int b2bID);

    public Task<EInvoiceRequest> HandleRequestStatus(bool approve, int requestID);
  }

  
}