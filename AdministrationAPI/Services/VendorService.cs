using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
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
            using (var context = new VendorDbContext())
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

                foreach (string id in request.AssignedUserIds)
                {
                    var vendorUser = new VendorUser() { VendorId = vendor.Id, UserId = id };
                    context.VendorUsers.Add(vendorUser);
                }
                context.SaveChanges();

                return true;
            }
        }

        public Vendor? Get(int id)
        {
            using (var context = new VendorDbContext())
            {
                return context.Vendors.FirstOrDefault(v => v.Id == id);
            }
        }

        public List<VendorsResponse> GetAll()
        {
            using (var context = new VendorDbContext())
            {
                var response = new List<VendorsResponse>() { };
                var vendors = context.Vendors.ToList();
                vendors.ForEach(vendor =>
                {
                    VendorsResponse vendorResponse = new()
                    {
                        Id = vendor.Id,
                        Name = vendor.Name,
                        Address = vendor.Address,
                        CompanyDetails = vendor.CompanyDetails,
                        Phone = vendor.Phone,
                        Created = vendor.Created,
                        CreatedBy = vendor.CreatedBy,
                        Modified = vendor.Modified,
                        ModifiedBy = vendor.ModifiedBy
                    };
                    response.Add(vendorResponse);
                });
                return response;
            }
        }

        public bool Delete(int id)
        {
            using (var context = new VendorDbContext())
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

        public bool UpdateAddress(int id, string address)
        {
            using (var context = new VendorDbContext())
            {
                var vendor = context.Vendors.FirstOrDefault(v => v.Id == id);

                if (vendor != null)
                {
                    vendor.Address = address;
                    vendor.Modified = DateTime.UtcNow;
                    context.SaveChanges();
                    return true;
                }

                return false;
            }
        }


        public bool DeleteAddress(int id)
        {
            using (var context = new VendorDbContext())
            {
                var vendor = context.Vendors.FirstOrDefault(v => v.Id == id);

                if (vendor != null)
                {
                    vendor.Address = null;
                    vendor.Modified = DateTime.UtcNow;
                    context.SaveChanges();
                    return true;
                }

                return false;
            }
        }





    }
}


