using AdministrationAPI.Models.EInvoice;
using AdministrationAPI.Models.EInvoiceForms;

namespace AdministrationAPI.Contracts.Responses
{
    public class EInvoiceList
    {
        public EInvoice eInvoice { get; set; }
        public List<string> paramsMeaning { get; set; }
    }
}
