using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Services
{
  public class AdminEInvoiceService : IAdminEInvoiceService
  {
    private readonly IConfiguration _configuration;
    private readonly AppDbContext _context;

    public AdminEInvoiceService(IConfiguration configuration, AppDbContext context)
    {
      _configuration = configuration;
      _context = context;
    }

    public async Task<List<EInvoiceRequest>> GetAllInvoiceRequests()
    {
      return await _context.EInvoiceRequests.ToListAsync();
    }
  }
}
