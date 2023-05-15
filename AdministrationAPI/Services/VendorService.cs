using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace AdministrationAPI.Services
{
    public class VendorService : IVendorService
    {
        private readonly IConfiguration _configuration;
        private readonly IDocumentService _documentService;
        private readonly AppDbContext _context;

        public VendorService(IConfiguration configuration, IDocumentService documentService, AppDbContext context)
        {
            _configuration = configuration;
            _documentService = documentService;
            _context = context;
        }

        #region VendorMain
        public bool Create(VendorCreateRequest request)
        {
            var vendor = new Vendors
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

            foreach (string id in request.AssignedUserIds)
            {
                var vendorUser = new VendorUser() { VendorId = vendor.Id, UserId = id };
                _context.VendorUsers.Add(vendorUser);
            }
            _context.SaveChanges();

            return true;
        }
        public Vendors? Get(int id)
        {
            return _context.Vendors.FirstOrDefault(v => v.Id == id);
        }
        public List<VendorsResponse> GetAll()
        {
            var response = new List<VendorsResponse>() { };
            var vendors = _context.Vendors.ToList();
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

        public Vendors? GetByName(string name)
        {
            return _context.Vendors.FirstOrDefault(v => v.Name == name);
        }

        public bool Delete(int id)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);
            if (vendor != null)
            {
                var vendorLocations = _context.VendorLocations.ToList().FindAll(loc =>
                {
                    return loc.VendorId == id;
                });
                vendorLocations.ForEach(loc =>
                {
                    var vendorPOS = _context.VendorPOS.ToList().FindAll(pos =>
                    {
                        return pos.LocationId == loc.Id;
                    });
                    vendorPOS.ForEach(pos =>
                    {
                        _context.VendorPOS.Remove(pos);
                    });
                    _context.VendorLocations.Remove(loc);
                });
                _context.Vendors.Remove(vendor);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        public bool UpdateAddress(int id, string address)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);

            if (vendor != null)
            {
                vendor.Address = address;
                vendor.Modified = DateTime.UtcNow;
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        public bool DeleteAddress(int id)
        {
            var vendor = _context.Vendors.FirstOrDefault(v => v.Id == id);

            if (vendor != null)
            {
                vendor.Address = null;
                vendor.Modified = DateTime.UtcNow;
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        #endregion
        #region VendorPOS
        public bool CreatePOS(POSCreateRequest request)
        {
            var pos = new VendorPOS
            {
                Name = request.Name,
                LocationId = request.LocationId,
                Created = DateTime.UtcNow,
                CreatedBy = request.CreatedBy
            };

            _context.VendorPOS.Add(pos);


            _context.SaveChanges();

            return true;
        }

        public VendorPOS? GetPOS(int id)
        {
            return _context.VendorPOS.FirstOrDefault(v => v.Id == id);
        }

        public List<POSResponse> GetAllPOS(int locationId)
        {
            var response = new List<POSResponse>();
            var vendors = _context.VendorPOS.Where(v => v.LocationId == locationId).ToList();
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

        public bool UpdatePOS(int id, POSUpdateRequest request)
        {
            var pos = _context.VendorPOS.FirstOrDefault(p => p.Id == id);

            if (pos != null)
            {
                pos.Name = request.Name;
                pos.LocationId = request.LocationId;
                pos.Modified = DateTime.UtcNow;
                pos.ModifiedBy = request.ModifiedBy;

                _context.VendorPOS.Update(pos);
                _context.SaveChanges();

                return true;
            }

            return false;
        }
        public bool DeletePOS(int id)
        {
            var vendor = _context.VendorPOS.FirstOrDefault(v => v.Id == id);

            if (vendor != null)
            {
                _context.VendorPOS.Remove(vendor);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        #endregion
        #region VendorLocation
        public bool CreateLocation(VendorLocationCreateRequest request)
        {
            var vendorLocation = new VendorLocation
            {
                Name = request.Name,
                Address = request.Address,
                Created = DateTime.UtcNow,
                CreatedBy = request.CreatedBy,
                VendorId = request.VendorId
            };
            _context.VendorLocations.Add(vendorLocation);
            _context.SaveChanges();
            return true;
        }
        public bool DeleteLocation(VendorLocationDeleteRequest request)
        {
            var vendorLocation = _context.VendorLocations.FirstOrDefault(l => l.Id == request.Id);

            if (vendorLocation != null)
            {
                _context.VendorLocations.Remove(vendorLocation);
                _context.SaveChanges();
                return true;
            }
            return false;
        }
        public VendorLocation? GetLocation(int id)
        {
            return _context.VendorLocations.FirstOrDefault(l => l.Id == id);
        }
        public List<VendorLocationResponse> GetAllLocations()
        {
            var response = new List<VendorLocationResponse>() { };
            var vendorLocations = _context.VendorLocations.ToList();
            vendorLocations.ForEach(loc =>
            {
                VendorLocationResponse vendorLocationResponse = new()
                {
                    Id = loc.Id,
                    Name = loc.Name,
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
        public List<VendorLocationResponse> GetAllLocationsWithVendorId(int id)
        {
            var response = new List<VendorLocationResponse>() { };
            var vendorLocations = _context.VendorLocations.ToList().FindAll(loc =>
            {
                return loc.VendorId == id;
            });
            vendorLocations.ForEach(loc =>
            {
                VendorLocationResponse vendorLocationResponse = new()
                {
                    Id = loc.Id,
                    Name = loc.Name,
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
        public bool UpdateLocation(VendorLocationUpdateRequest request)
        {
            var vendorLocation = _context.VendorLocations.FirstOrDefault(l => l.Id == request.Id);

            if (vendorLocation != null)
            {
                vendorLocation.Name = request.Name;
                vendorLocation.Address = request.Address;
                vendorLocation.Modified = DateTime.UtcNow;
                vendorLocation.ModifiedBy = request.ModifiedBy;
                vendorLocation.VendorId = request.VendorId;
                _context.VendorLocations.Update(vendorLocation);
                _context.SaveChanges();
                return true;
            };
            return false;
        }
        #endregion
        #region PaymentTerms
        public int CreatePaymentTerm(PaymentTermRequest request)
        {
            var paymentTerm = new VendorPaymentTerm
            {
                Name = request.Name,
                VendorId = request.VendorId,
                StartDate = request.StartDate,
                ExpiryDate = request.ExpiryDate,
                InvoiceFrequencyTypeId = request.InvoiceFrequencyTypeId,
                DueDate = request.DueDate,
                Created = DateTime.UtcNow,
                CreatedBy = request.CreatedBy
            };

            _context.VendorPaymentTerm.Add(paymentTerm);
            _context.SaveChanges();

            //Create bond between contracts and payment terms
            foreach (var documentId in request.DocumentIds)
            {
                var paymentTermContract = new VendorPaymentTermContract
                {
                    PaymentTermId = paymentTerm.Id,
                    ContractId = documentId,
                };
                _context.VendorPaymentTermContract.Add(paymentTermContract);
            }

            _context.SaveChanges();

            return paymentTerm.Id;
        }

        public List<PaymentTermResponse> GetAllPaymentTerms(int vendorId)
        {
            var paymentTerms = _context.VendorPaymentTerm.Where(x => x.VendorId == vendorId).ToList();
            var paymentTermResponse = new List<PaymentTermResponse>();
            foreach (var pt in paymentTerms)
            {
                InvoiceFrequency invoiceFrequency = _context.InvoiceFrequency.FirstOrDefault(x => x.Id == pt.InvoiceFrequencyTypeId);

                var documentIds = _context.VendorPaymentTermContract.Where(x => x.PaymentTermId == pt.Id).Select(x => x.ContractId);
                var contracts = _context.Documents.Where(c => documentIds.Contains(c.Id)).ToList();

                var paymentTerm = new PaymentTermResponse()
                {
                    Id = pt.Id,
                    Name = pt.Name,
                    StartDate = pt.StartDate,
                    ExpiryDate = pt.ExpiryDate,
                    DueDate = pt.DueDate,
                    Created = pt.Created,
                    CreatedBy = pt.CreatedBy,
                    Modified = pt.Modified,
                    ModifiedBy = pt.ModifiedBy,
                    Contracts = contracts,
                    InvoiceFrequencyType = invoiceFrequency
                };

                paymentTermResponse.Add(paymentTerm);
            }

            return paymentTermResponse;
        }

        public VendorPaymentTerm GetPaymentTerm(int id)
        {
            var documentIds = _context.VendorPaymentTermContract.Where(x => x.PaymentTermId == id).Select(x => x.ContractId).ToList();
            var paymentTerm = _context.VendorPaymentTerm.FirstOrDefault(x => x.Id == id);

            paymentTerm.Contracts = _context.Documents.Where(c => documentIds.Contains(c.Id)).ToList();

            return paymentTerm;
        }

        public bool UpdatePaymentTerm(PaymentTermRequest paymentTermRequest)
        {
            var paymentTerm = _context.VendorPaymentTerm.FirstOrDefault(p => p.Id == paymentTermRequest.Id);
            var paymentTermContract = _context.VendorPaymentTermContract.Where(x => x.PaymentTermId == paymentTermRequest.Id);

            if (paymentTerm != null)
            {
                foreach (var payCon in paymentTermContract)
                {
                    _context.VendorPaymentTermContract.Remove(payCon);
                }
                foreach (var docId in paymentTermRequest.DocumentIds)
                {
                    var paymentContract = new VendorPaymentTermContract()
                    {
                        ContractId = docId,
                        PaymentTermId = paymentTermRequest.Id,
                    };

                    _context.VendorPaymentTermContract.Add(paymentContract);
                }

                paymentTerm.Name = paymentTermRequest.Name;
                paymentTerm.StartDate = paymentTermRequest.StartDate;
                paymentTerm.DueDate = paymentTermRequest.DueDate;
                paymentTerm.ExpiryDate = paymentTermRequest.ExpiryDate;
                paymentTerm.Modified = DateTime.UtcNow;
                paymentTerm.ModifiedBy = paymentTermRequest.ModifiedBy;
                paymentTerm.InvoiceFrequencyTypeId = paymentTermRequest.InvoiceFrequencyTypeId;

                _context.VendorPaymentTerm.Update(paymentTerm);
                _context.SaveChanges();

                return true;
            }

            return false;
        }
        public bool DeletePaymentTerm(int id)
        {
            var paymentTerm = _context.VendorPaymentTerm.FirstOrDefault(v => v.Id == id);
            var documentIds = _context.VendorPaymentTermContract.Where(v => v.PaymentTermId == id).ToList();
            var contracts = _context.Documents.Where(d => documentIds.Select(x => x.ContractId).Contains(d.Id)).ToList();

            if (paymentTerm != null)
            {
                foreach (var doc in documentIds)
                {
                    _documentService.DocumentDelete(doc.ContractId);
                    _context.VendorPaymentTermContract.Remove(doc);
                }

                _context.VendorPaymentTerm.Remove(paymentTerm);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
        #endregion
        #region InvoiceFrequency
        public List<InvoiceFrequency> GetInvoiceFrequencies()
        {
            return _context.InvoiceFrequency.ToList();
        }



        #endregion

        #region VendorUserRoles

        public async Task<IEnumerable<VendorRoles>> GetVendorUserRoles()
        {
            return await _context.VendorRoles.ToListAsync();
        }
        public async Task<VendorRoles> GetRoleById(Guid roleId)
        {
            return await _context.VendorRoles.FirstOrDefaultAsync(vur => vur.Id == roleId);
        }

        public async Task<IEnumerable<VendorRoles>> GetRolesForVendorUser(int vendorUserId)
        {

            var vendorUser = await _context.VendorUsers.FirstOrDefaultAsync(vu => vu.Id == vendorUserId);

            var roles = await _context.VendorUserRoles.Where(vur => vur.VendorUserId == vendorUserId).Select(r => r.RoleId).ToListAsync();

            var returnList = new List<VendorRoles>();

            foreach (var role in roles)
            {
                returnList.Add(await GetRoleById(role));
            }
            return returnList;

        }

        public async Task<Boolean> IsVendorUserAdmin(int adminId)
        {
            var roles = await GetRolesForVendorUser(adminId);
            return await Task.Run(() => roles.Any(role => role.Name == "VendorAdmin"));
        }

        public async Task<IEnumerable<VendorUser>> GetVendorUsersForAdmin(int adminId)
        {
            var roles = await GetRolesForVendorUser(adminId);


            if (await Task.Run(() => roles.Any(role => role.Name == "VendorAdmin")))
            {
                var vendorUser = await _context.VendorUsers.FirstOrDefaultAsync(vu => vu.Id == adminId);
                var vendorId = vendorUser.VendorId;

                return await _context.VendorUsers.Where(vu => vu.VendorId == vendorId).ToListAsync();
            }
            return null;
        }


        #endregion
    }
}