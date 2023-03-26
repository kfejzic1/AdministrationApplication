using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Services
{
    public class VendorService : IVendorService
    {

        private readonly AppDbContext _context;
  

        public VendorService(AppDbContext context)
        {
            _context = context;
        }



        public bool Create(VendorCreateRequest request)
        {
            var vendor = new Vendor
            {
                Name = request.Name,
                Address = request.Address,
                CompanyDetails = request.CompanyDetails,
                Phone = request.Phone,
                Created = DateTime.UtcNow,
                CreatedBy = request.CreatedBy
            };

            _context.Vendors.Add(vendor);
            _context.SaveChanges();

            return true;
        }
        //trenutno su deklarisani kao nullable za svaki slc
        public Vendor? Get(int id)
        {
            return _context.Vendors.FirstOrDefault(v => v.Id == id);
        }

      

        public string? GetName(int id)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);

            return vendor?.Name;
        }

        public string? GetAddress(int id)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);

            return vendor?.Address;
        }

        public string? GetCompanyDetails(int id)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);

            return vendor?.CompanyDetails;
        }

        public string? GetPhone(int id)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);

            return vendor?.Phone;
        }

        public bool Delete(int id)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);

            if (vendor != null)
            {
                _context.Vendors.Remove(vendor);
                _context.SaveChanges();
                return true;
            }

            return false;
        }

        public bool AssignUserToVendor(int vendorId, int userId)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == vendorId);
            var user = _context.Users.FirstOrDefault(u => u.Id == userId);

            if (vendor == null || user == null)
            {
                return false;
            }

            user.Vendor_Id = vendorId;
            _context.SaveChanges();

            return true;
        }
    }


}

  

