using AdministrationAPI.Contracts.Requests.EInvoices;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models.EInvoice;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IEInvoiceService
    {
        Task<EInvoice> CreateEInvoice(EInvoiceCreateRequest eInvoiceRequest);
        List<EInvoiceList> ListEInvoices(string userId);
    }
}
