﻿using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services.Interfaces;

namespace AdministrationAPI.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly IConfiguration _configuration;
        private readonly AppDbContext _context;

        public DocumentService(IConfiguration configuration, AppDbContext context)
        {
            _configuration = configuration;
            _context = context; 
        }
        public int UploadDocument(MemoryStream file, Document document)
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

                _context.Add(document);
                _context.SaveChanges();

                return document.Id;
            }

            throw new FileNotFoundException("File with this name already exists in folder: " + document.Folder);
            
        }
        public Document GetDocument(int id)
        {
            return _context.Documents.FirstOrDefault(d => d.Id == id);
        }
        public List<Document> GetAllDocuments()
        {
            return _context.Documents.ToList();
            
        }
        public bool DocumentDelete(int id) 
        {
            var doc = GetDocument(id);

            if (doc != null)
            {
                if (File.Exists(doc.UNC))
                    File.Delete(doc.UNC);

                _context.Documents.Remove(doc);
                _context.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
