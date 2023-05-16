using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.EInvoiceRegistration;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.EInvoiceForms;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace AdministrationAPI.Services
{
    public class AdminEInvoiceService : IAdminEInvoiceService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;

        private readonly IVendorService _vendorService;
        private readonly IUserService _userService;

        public AdminEInvoiceService(IConfiguration configuration, AppDbContext context, IVendorService vendorService, IUserService userService)
        {
            _configuration = configuration;
            _context = context;
            _vendorService = vendorService;
            _userService = userService;
        }

        public async Task<List<EInvoiceRequest>> GetAllInvoiceRequests()
        {
            return await _context.EInvoiceRequests.Include("User").Include("Vendor").ToListAsync();
        }


        public async Task<List<EInvoiceRequest>> GetInvoiceRequestsByID(int b2bID)
        {
            var eInvoiceRequests = await _context.EInvoiceRequests.Include("User").Include("Vendor").Where(ereq => ereq.VendorId == b2bID).ToListAsync();
            return eInvoiceRequests;
        }


        public async Task<EInvoiceRequest> HandleRequestStatus(bool approve, int requestID)
        {

            var request = await _context.EInvoiceRequests.Include("User").Include("Vendor").FirstOrDefaultAsync(r => r.EInvoiceRequestId == requestID);

            // If the request is not found, return a 404 Not Found response
            if (request == null)
            {
                throw new Exception("Request not found");
            }

            if (request.Status != 1)
            {
                throw new Exception("The request has already been handled");

            }


            request.Status = approve ? 2 : 0;
            await _context.SaveChangesAsync();

            // Return the Request object with the "approved" variable set
            return request;


        }

        public async Task<Vendors> DefineRequiredDataForVendor(int vendorId, RequiredData data)
        {
            var vendor = await _context.Vendors.FirstOrDefaultAsync(vendor => vendor.Id == vendorId);
            if (vendor == null)
            {
                throw new Exception("Vendor not found");
            }

            vendor.Param1 = data.Param1;

            vendor.Param2 = data.Param2;

            vendor.Param3 = data.Param3;

            vendor.Param4 = data.Param4;

            await _context.SaveChangesAsync();
            return vendor;
        }

        public async Task<EInvoiceRequest> AddEInvoiceRequest(EInvoiceRegistrationData eInvoiceRegistrationData, string userId)
        {
            var vendor = _vendorService.GetByName(eInvoiceRegistrationData.B2BName);

            if (vendor == null)
            {
                throw new DataException("Vendor doesn't exist");
            }

            var user = await _userService.GetUser(userId);

            var eInvoiceRequest = new EInvoiceRequest
            {
                User = await _userService.GetUserByEmailPhone(user.Email, null),
                Vendor = vendor,
                Status = 1,
                Param1 = eInvoiceRegistrationData.Field1,
                Param2 = eInvoiceRegistrationData.Field2,
                Param3 = eInvoiceRegistrationData.Field3,
                Param4 = eInvoiceRegistrationData.Field4,
            };

            await _context.EInvoiceRequests.AddAsync(eInvoiceRequest);
            await _context.SaveChangesAsync();

            return eInvoiceRequest;
        }
    }
  }


