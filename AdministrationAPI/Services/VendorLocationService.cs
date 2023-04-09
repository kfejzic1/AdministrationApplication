using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;

namespace AdministrationAPI.Services
{
    public class VendorLocationService : IVendorLocationService
    {
        public VendorLocationService()
        {
        }

        public bool Create(VendorLocationCreateRequest request)
        {
            using (var context = new VendorDbContext())
            {
                var vendorLocation = new VendorLocation
                {
                    Address = request.Address,
                    Created = DateTime.UtcNow,
                    CreatedBy = request.CreatedBy,
                    VendorId = request.VendorId
                };
                context.VendorLocations.Add(vendorLocation);
                context.SaveChanges();
                return true;
            }
        }

        public bool Delete(VendorLocationDeleteRequest request)
        {
            using (var context = new VendorDbContext())
            {
                var vendorLocation = context.VendorLocations.FirstOrDefault(l => l.Id == request.Id);
                if (vendorLocation != null)
                {
                    var vendorPOS = context.VendorPOS.ToList().FindAll(pos =>
                    {
                        return pos.LocationId == vendorLocation.Id;
                    });
                    vendorPOS.ForEach(pos =>
                    {
                        context.VendorPOS.Remove(pos);
                    });
                    context.VendorLocations.Remove(vendorLocation);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }

        public VendorLocation? Get(int id)
        {
            using (var context = new VendorDbContext())
            {
                return context.VendorLocations.FirstOrDefault(l => l.Id == id);
            }
        }

        public List<VendorLocationResponse> GetAll()
        {
            using (var context = new VendorDbContext())
            {
                var response = new List<VendorLocationResponse>() { };
                var vendorLocations = context.VendorLocations.ToList();
                vendorLocations.ForEach(loc =>
                {
                    VendorLocationResponse vendorLocationResponse = new()
                    {
                        Id = loc.Id,
                        Address = loc.Address,
                        Created = loc.Created,
                        CreatedBy = loc.CreatedBy,
                        VendorId = loc.VendorId,
                        Modified = loc.Modified,
                        ModifiedBy = loc.ModifiedBy
                    };
                    response.Add(vendorLocationResponse);
                });
                return response;
            }
        }

        public List<VendorLocationResponse> GetAllWithVendorId(int id)
        {
            using (var context = new VendorDbContext())
            {
                var response = new List<VendorLocationResponse>() { };
                var vendorLocations = context.VendorLocations.ToList().FindAll(loc =>
                {
                    return loc.VendorId == id;
                });
                vendorLocations.ForEach(loc =>
                {
                    VendorLocationResponse vendorLocationResponse = new()
                    {
                        Id = loc.Id,
                        Address = loc.Address,
                        Created = loc.Created,
                        CreatedBy = loc.CreatedBy,
                        VendorId = loc.VendorId,
                        Modified = loc.Modified,
                        ModifiedBy = loc.ModifiedBy
                    };
                    response.Add(vendorLocationResponse);
                });
                return response;
            }
        }

        public bool Update(VendorLocationUpdateRequest request)
        {
            using (var context = new VendorDbContext())
            {
                var vendorLocation = context.VendorLocations.FirstOrDefault(l => l.Id == request.Id);

                if (vendorLocation != null)
                {
                    vendorLocation.Address = request.Address;
                    vendorLocation.Modified = DateTime.UtcNow;
                    vendorLocation.ModifiedBy = request.ModifiedBy;
                    vendorLocation.VendorId = request.VendorId;
                    context.VendorLocations.Update(vendorLocation);
                    context.SaveChanges();
                    return true;
                };
                return false;
            }
        }

    }
}