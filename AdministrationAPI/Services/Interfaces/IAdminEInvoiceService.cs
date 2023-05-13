using AdministrationAPI.Models.Vendor;

namespace AdministrationAPI.Services.Interfaces
{
  public interface IAdminEInvoiceService
  {
    public Task<List<EInvoiceRequest>> GetAllInvoiceRequests();

    public List<EInvoiceRequest> GetInvoiceRequestsByID(int b2bID);
  }
}