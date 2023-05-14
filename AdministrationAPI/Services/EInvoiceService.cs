using AdministrationAPI.Data;
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


    }
}
