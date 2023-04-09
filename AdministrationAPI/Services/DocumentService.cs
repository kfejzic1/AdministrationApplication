using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Org.BouncyCastle.Asn1.X509;
using Org.BouncyCastle.Utilities;
using System;

namespace AdministrationAPI.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IConfiguration _configuration;

        public DocumentService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public int UploadDocument(MemoryStream file, Document document)
        {
            using (VendorDbContext vendorDbContext = new VendorDbContext())
            {
                var documentUploadLocationPhysical = _configuration["UploadRootFolder:DefaultDocumentFolder"].Replace('\\', '/').TrimEnd('/');

                document.Extension = document.FileName.Substring(document.FileName.LastIndexOf('.'));
                document.UNC = documentUploadLocationPhysical + "/" + document.Folder + '/' + document.FileName;

                if (!Directory.Exists(documentUploadLocationPhysical + "/" + document.Folder))
                    Directory.CreateDirectory(documentUploadLocationPhysical + "/" + document.Folder);

                if (!File.Exists(document.UNC))
                {
                    using (var fileStream = new FileStream(document.UNC, FileMode.Create, FileAccess.Write))
                    {
                        file.Position = 0;
                        file.CopyTo(fileStream);
                    }

                    vendorDbContext.Add(document);

                    var vendorPaymentTermContracts = new VendorPaymentTermContract
                    {
                        ContractId = document.Id,
                        PaymentTermId = paymentTermId
                    };
                    vendorDbContext.Add(vendorPaymentTermContracts);
                    vendorDbContext.SaveChanges();

                    return document.Id;
                }

                throw new FileNotFoundException("File with this name already exists in folder: " + document.Folder);
            }
        }
        public Document GetDocument(int id)
        {
            using (VendorDbContext vendorDbContext = new VendorDbContext())
            {
                return (Document)vendorDbContext.Documents.Where<Document>(d => d.Id == id);
            }
        }
        public List<Document> GetAllDocuments()
        {
            using (VendorDbContext vendorDbContext = new VendorDbContext())
            {
                return vendorDbContext.Documents.ToList();
            }
        }
        public bool DocumentDelete(int id) 
        {
            using (VendorDbContext vendorDbContext = new VendorDbContext())
            {
                var doc = GetDocument(id);

                if (doc != null)
                {
                    vendorDbContext.Documents.Remove(doc);
                    vendorDbContext.SaveChanges();
                    return true;
                }

                return false;
            }
        }
    }
}
