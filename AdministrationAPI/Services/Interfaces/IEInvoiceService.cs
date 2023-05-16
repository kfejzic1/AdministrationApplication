using AdministrationAPI.Contracts.Requests.EInvoices;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models.EInvoice;
using AdministrationAPI.Models.EInvoiceForms;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IEInvoiceService
    {
        Task<EInvoice> CreateEInvoice(EInvoiceCreateRequestOneLiner eInvoiceRequestOneLiner);
        List<EInvoiceList> ListEInvoices(string userId);
        Task<EInvoice> PayEnvoice(int id);
    }
}
