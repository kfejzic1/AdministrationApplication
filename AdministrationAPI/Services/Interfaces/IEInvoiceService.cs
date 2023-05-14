using AdministrationAPI.Contracts.Requests.EInvoices;
using AdministrationAPI.Models.EInvoice;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IEInvoiceService
    {
        Task<EInvoice> CreateEInvoice(EInvoiceCreateRequest eInvoiceRequest);
        List<EInvoice> ListEInvoices(string userId);
    }
}
