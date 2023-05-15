using AdministrationAPI.Models.EInvoice;

namespace AdministrationAPI.Contracts.Responses
{
    public class EInvoiceList
    {
        public EInvoice eInvoice { get; set; }
        public List<string> paramsMeaning { get; set; }
    }
}
