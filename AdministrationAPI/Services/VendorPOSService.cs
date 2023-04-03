using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Services
{
    public class VendorPOSService : IVendorPOSService
    {
        public VendorPOSService()
        {
        }

        public bool Create(POSCreateRequest request)
        {
            using (var context = new VendorDbContext())
            {
                var pos = new VendorPOS
                {
                    Name = request.Name,
                    LocationId = request.LocationId,
                    Created = DateTime.UtcNow,
                    CreatedBy = request.CreatedBy
                };

                context.VendorPOS.Add(pos);


                context.SaveChanges();

                return true;
            }
        }

        public VendorPOS? Get(int id)
        {
            using (var context = new VendorDbContext())
            {
                return context.VendorPOS.FirstOrDefault(v => v.Id == id);
            }
        }

        public List<POSResponse> GetAll(int locationId)
        {
            using (var context = new VendorDbContext())
            {
                var response = new List<POSResponse>();
                var vendors = context.VendorPOS.Where(v => v.LocationId == locationId).ToList();
                vendors.ForEach(vendor =>
                {
                    POSResponse vendorResponse = new()
                    {
                        Id = vendor.Id,
                        Name = vendor.Name,
                        LocationId = vendor.LocationId,
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

        public bool Update(int id, POSUpdateRequest request)
        {
            using (var context = new VendorDbContext())
            {
                var pos = context.VendorPOS.FirstOrDefault(p => p.Id == id);

                if (pos != null)
                {
                    pos.Name = request.Name;
                    pos.LocationId = request.LocationId;
                    pos.Modified = DateTime.UtcNow;
                    pos.ModifiedBy = request.ModifiedBy;

                    context.VendorPOS.Update(pos);
                    context.SaveChanges();

                    return true;
                }

                return false;
            }
        }
        public bool Delete(int id)
        {
            using (var context = new VendorDbContext())
            {
                var vendor = context.VendorPOS.FirstOrDefault(v => v.Id == id);

                if (vendor != null)
                {
                    context.VendorPOS.Remove(vendor);
                    context.SaveChanges();
                    return true;
                }

                return false;
            }
        }



    }
}
