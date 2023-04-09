﻿using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;

namespace AdministrationAPI.Services
{
    public class VendorService : IVendorService
    {
        private readonly IConfiguration _configuration;

        public VendorService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region VendorMain
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
        #endregion
        #region VendorPOS
        public bool CreatePOS(POSCreateRequest request)
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

        public VendorPOS? GetPOS(int id)
        {
            using (var context = new VendorDbContext())
            {
                return context.VendorPOS.FirstOrDefault(v => v.Id == id);
            }
        }

        public List<POSResponse> GetAllPOS(int locationId)
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

        public bool UpdatePOS(int id, POSUpdateRequest request)
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
        public bool DeletePOS(int id)
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
        #endregion
        #region VendorLocation
        public bool CreateLocation(VendorLocationCreateRequest request)
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
        public bool DeleteLocation(VendorLocationDeleteRequest request)
        {
            using (var context = new VendorDbContext())
            {
                var vendorLocation = context.VendorLocations.FirstOrDefault(l => l.Id == request.Id);

                if (vendorLocation != null)
                {
                    context.VendorLocations.Remove(vendorLocation);
                    context.SaveChanges();
                    return true;
                }
                return false;
            }
        }
        public VendorLocation? GetLocation(int id)
        {
            using (var context = new VendorDbContext())
            {
                return context.VendorLocations.FirstOrDefault(l => l.Id == id);
            }
        }
        public List<VendorLocationResponse> GetAllLocations()
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
        public List<VendorLocationResponse> GetAllLocationsWithVendorId(int id)
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
        public bool UpdateLocation(VendorLocationUpdateRequest request)
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
        #endregion
        #region PaymentTerms
        public int CreatePaymentTerm(PaymentTermRequest request)
        {
            using (var vendorDbContext = new VendorDbContext())
            {
                var paymentTerm = new VendorPaymentTerm
                {
                    StartDate = request.StartDate,
                    ExpiryDate = request.ExpiryDate,
                    InvoiceFrequencyTypeId = request.InvoiceFrequencyTypeId,
                    DueDate = request.DueDate,
                    Created = DateTime.UtcNow,
                    CreatedBy = request.CreatedBy
                };

                vendorDbContext.VendorPaymentTerm.Add(paymentTerm);
                vendorDbContext.SaveChanges();

                //Create bond between contracts and payment terms
                foreach (var doc in request.Contracts)
                {
                    var paymentTermContract = new VendorPaymentTermContract
                    {
                        PaymentTermId = request.Id,
                        ContractId = doc.Id,
                    };
                    vendorDbContext.VendorPaymentTermContract.Add(paymentTermContract);
                }
                vendorDbContext.SaveChanges();

                return paymentTerm.Id;
            }
        }
        #endregion
    }
}


