using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Services
{
    public class VendorService : IVendorService
    {
        public VendorService()
        {
        }

        public bool Create(VendorCreateRequest request)
        {
            using (var context = new AppDbContext())
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

                context.Vendors.Add(vendor);
                context.SaveChanges();

                var users = context.Users.Where(x => request.AssignedUserIds.Contains(x.Id));
                users.ExecuteUpdate(s => s.SetProperty(b => b.VendorId, vendor.Id));

                return true;
            }
        }
        //trenutno su deklarisani kao nullable za svaki slc
        public Vendor? Get(int id)
        {
            using (var context = new AppDbContext())
            {
                return context.Vendors.FirstOrDefault(v => v.Id == id);
            }
        }

        public List<Vendor> GetAll()
        {
            using (var context = new AppDbContext())
            {
                return context.Vendors.ToList();
            }
        }

        public bool Delete(int id)
        {
            using (var context = new AppDbContext())
            {
                var vendor = context.Vendors.FirstOrDefault(v => v.Id == id);

                if (vendor != null)
                {
                    context.Vendors.Remove(vendor);
                    context.SaveChanges();
                    return true;
                }

                return false;
            }
        }

        public bool AssignUserToVendor(int vendorId, int userId)
        {
            using (var context = new AppDbContext())
            {
                var vendor = context.Vendors.FirstOrDefault(v => v.Id == vendorId);
                var user = context.Users.FirstOrDefault(u => u.Id == userId);

                if (vendor == null || user == null)
                {
                    return false;
                }

                user.VendorId = vendorId;
                context.SaveChanges();

                return true;
            }
        }
    }


}

  

