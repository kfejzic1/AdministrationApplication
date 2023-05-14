using AdministrationAPI.Contracts.Requests.EInvoices;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.EInvoice;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;

namespace AdministrationAPI.Services
{
    public class EInvoiceService : IEInvoiceService
    {
        private readonly AppDbContext _context;
        public EInvoiceService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<EInvoice> CreateEInvoice(EInvoiceCreateRequest eInvoiceRequest)
        {
            var request = _context.EInvoiceRequests.FirstOrDefault(obj =>
            obj.Param1 == eInvoiceRequest.Param1 &&
            obj.Param2 == eInvoiceRequest.Param2 &&
            obj.Param3 == eInvoiceRequest.Param3 &&
            obj.Param4 == eInvoiceRequest.Param4);

            if (request != null)
            {

                var eInvoice = new EInvoice
                {
                    PayerId = request.UserId,
                    PayerName = eInvoiceRequest.PayerName,
                    PayerAdress = eInvoiceRequest.PayeeAdress,
                    Reference = eInvoiceRequest.Reference,
                    PayeeName = eInvoiceRequest.PayerName,
                    PayeeAccountNumber = eInvoiceRequest.PayeeAccountNumber,
                    PayeeAdress = eInvoiceRequest.PayeeAdress,
                    Amount = eInvoiceRequest.Amount,
                    CurrencyId = eInvoiceRequest.CurrencyId
                };

                _context.EInvoices.Add(eInvoice);
                await _context.SaveChangesAsync();
                string name = _context.Currencies.FirstOrDefault(c => c.Id == eInvoiceRequest.CurrencyId).Name;
                eInvoice.Currency = new Currency() { Name = name };

                return eInvoice;

            }

            throw new Exception("Mapping not found.");
        }

        public List<EInvoice> ListEInvoices(string userId)
        {
            var eInvoices = _context.EInvoices.Where(e => e.PayerId==userId).ToList();
            eInvoices.ForEach(eInvoice =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == eInvoice.CurrencyId).Name;
                eInvoice.Currency = new Currency() { Name = name };
            });
            return eInvoices;
        }
    }
}
