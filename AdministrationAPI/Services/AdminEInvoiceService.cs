using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
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
      return await _context.EInvoiceRequests.Include("User").Include("Vendor").ToListAsync();
    }

        //    public List<EInvoiceRequest> GetInvoiceRequestsByID(int id);

     public async Task<List<EInvoiceRequest>> GetInvoiceRequestsByID(int b2bID)
     {
        var eInvoiceRequests = await _context.EInvoiceRequests.Include("User").Include("Vendor").Where(ereq => ereq.VendorId == b2bID).ToListAsync();
        return eInvoiceRequests;
     }


     public async Task<EInvoiceRequest> HandleRequestStatus(bool approve, int requestID) {

      var request =  await _context.EInvoiceRequests.Include("User").Include("Vendor").FirstOrDefaultAsync(r => r.EInvoiceRequestId == requestID);

    // If the request is not found, return a 404 Not Found response
    if (request == null)
    {
        throw new Exception("Request not found");
    }

    if (request.Status != 1) {
      Console.WriteLine("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAaaa");
      throw new Exception("The request has already been handled");

    }


    request.Status=approve ? 2 : 0;
    await _context.SaveChangesAsync();

    // Return the Request object with the "approved" variable set
    return request;


     }

    }
}
