using AdministrationAPI.Contracts.Requests.EInvoices;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.EInvoice;
using AdministrationAPI.Models.EInvoiceForms;
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

        public async Task<EInvoice> CreateEInvoice(EInvoiceCreateRequestOneLiner eInvoiceRequestOneLiner)
        {

            string[] values = eInvoiceRequestOneLiner.Invoice.Split(';');
            string[] money = values[7].Split(' ');
            EInvoiceCreateRequest eInvoiceRequest = new EInvoiceCreateRequest()
            {
                PayerName = values[0],
                PayerAddress = values[1],
                Reference = values[2],
                Description = values[3],
                PayeeName = values[4],
                PayeeAccountNumber = values[5],
                PayeeAddress = values[6],
                Amount = double.Parse(money[0]),
                CurrencyName = money[1],
                Param1 = values[8],
                Param2 = values.Length > 9 ? values[9] : null,
                Param3 = values.Length > 10 ? values[10] : null,
                Param4 = values.Length > 11 ? values[11] : null
            };

            EInvoiceLog eInvoiceLog = new EInvoiceLog()
            {
                PayerName = values[0],
                PayerAddress = values[1],
                Reference = values[2],
                Description = values[3],
                PayeeName = values[4],
                PayeeAccountNumber = int.Parse(values[5]),
                PayeeAddress = values[6],
                Amount = double.Parse(money[0]),
                CurrencyName = money[1],
                Param1 = values[8],
                Param2 = values.Length > 9 ? values[9] : null,
                Param3 = values.Length > 10 ? values[10] : null,
                Param4 = values.Length > 11 ? values[11] : null
            };

            var request = _context.EInvoiceRequests.FirstOrDefault(e =>
            e.Param1 == eInvoiceRequest.Param1 &&
            e.Param2 == eInvoiceRequest.Param2 &&
            e.Param3 == eInvoiceRequest.Param3 &&
            e.Param4 == eInvoiceRequest.Param4);

            if (request != null)
            {
                eInvoiceLog.Successful = true;
                var currencyId = _context.Currencies.FirstOrDefault(c => c.Name == eInvoiceRequest.CurrencyName).Id;
                if(currencyId == null) 
                {
                    throw new Exception("Currency not found.");
                }
                var eInvoice = new EInvoice
                {
                    PayerId = request.UserId,
                    PayerName = eInvoiceRequest.PayerName,
                    PayerAddress = eInvoiceRequest.PayerAddress,
                    Reference = eInvoiceRequest.Reference,
                    Description = eInvoiceRequest.Description,
                    PayeeName = eInvoiceRequest.PayeeName,
                    PayeeAccountNumber = eInvoiceRequest.PayeeAccountNumber,
                    PayeeAddress = eInvoiceRequest.PayeeAddress,
                    Amount = eInvoiceRequest.Amount,
                    CurrencyId = currencyId,
                    Paid = false,
                    Param1 = eInvoiceRequest.Param1,
                    Param2 = eInvoiceRequest.Param2,
                    Param3 = eInvoiceRequest.Param3,
                    Param4 = eInvoiceRequest.Param4,
                };

                _context.EInvoices.Add(eInvoice);
                await _context.SaveChangesAsync();
                _context.EInvoiceLogs.Add(eInvoiceLog);
                await _context.SaveChangesAsync();
                string name = _context.Currencies.FirstOrDefault(c => c.Id == currencyId).Name;
                eInvoice.Currency = new Currency() { Name = name };

                return eInvoice;

            }
            eInvoiceLog.Successful = false;
            _context.EInvoiceLogs.Add(eInvoiceLog);
            await _context.SaveChangesAsync();
            throw new Exception("Mapping not found.");
        }

        public List<EInvoiceList> ListEInvoices(string userId)
        {
            var eInvoices = _context.EInvoices.Where(e => e.PayerId==userId).ToList();
            eInvoices.ForEach(eInvoice =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == eInvoice.CurrencyId).Name;
                eInvoice.Currency = new Currency() { Name = name };
            });
            var eInvoicesList = new List<EInvoiceList>();
            foreach (var eInvoice in eInvoices)
            {
                var vendorId = _context.EInvoiceRequests.FirstOrDefault(e =>
                e.Param1 == eInvoice.Param1 &&
                e.Param2 == eInvoice.Param2 &&
                e.Param3 == eInvoice.Param3 &&
                e.Param4 == eInvoice.Param4).VendorId;
                var vendor = _context.Vendors.FirstOrDefault(v => v.Id == vendorId);
                var paramsMeaning = new List<string>()
                {
                    vendor.Param1,
                    vendor.Param2,
                    vendor.Param3,
                    vendor.Param4
                };
                eInvoicesList.Add(new EInvoiceList() 
                { 
                    eInvoice = eInvoice,
                    paramsMeaning = paramsMeaning
                });
            }
            return eInvoicesList;
        }

        public async Task<EInvoice> PayEnvoice(int id)
        {
            var eInvoice = _context.EInvoices.FirstOrDefault(x => x.Id == id);
            if (eInvoice == null)
                throw new Exception("EInvoice not found.");
            if (eInvoice.Paid == true)
                throw new Exception("EInvoice is already paid.");
            eInvoice.Paid = true;
            await _context.SaveChangesAsync();
            string name = _context.Currencies.FirstOrDefault(c => c.Id == eInvoice.CurrencyId).Name;
            eInvoice.Currency = new Currency() { Name = name };
            return eInvoice;
        }
    }
}
