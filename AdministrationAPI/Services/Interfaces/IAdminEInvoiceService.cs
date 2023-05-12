using AdministrationAPI.Models.Vendor;

namespace AdministrationAPI.Services.Interfaces
{
  public interface IAdminEInvoiceService
  {
    public Task<List<EInvoiceRequest>> GetAllInvoiceRequests();

  }
}