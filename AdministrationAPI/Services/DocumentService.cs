using AdministrationAPI.Data;
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

        string createDocumentUNC(string folder, string fileName)
        {
            var documentUploadLocationPhysical = Environment.GetEnvironmentVariable("UPLOAD_DOCUMENT_PATH").Replace('\\', '/').TrimEnd('/');
            return documentUploadLocationPhysical + "/" + folder + '/' + fileName;
        }

        public int UploadDocument(MemoryStream file, Document document)
        {
            var documentUploadLocationPhysical = Environment.GetEnvironmentVariable("UPLOAD_DOCUMENT_PATH").Replace('\\', '/').TrimEnd('/');

            document.Extension = document.FileName.Substring(document.FileName.LastIndexOf('.'));
            document.UNC = createDocumentUNC(document.Folder, document.FileName);

            if (!Directory.Exists(documentUploadLocationPhysical + "/" + document.Folder))
                Directory.CreateDirectory(documentUploadLocationPhysical + "/" + document.Folder);

            var fileUNC = document.UNC;
            var fileNumber = 0;
            var fileName = document.FileName;
            while (File.Exists(fileUNC))
            {
                fileNumber++;
                fileName = document.FileName.Substring(0, document.FileName.LastIndexOf('.')) + '_' + fileNumber + document.Extension;
                fileUNC = createDocumentUNC(document.Folder, fileName);
            }
            document.UNC = fileUNC;
            document.FileName = fileName;
            using (var fileStream = new FileStream(document.UNC, FileMode.Create, FileAccess.Write))
            {
                file.Position = 0;
                file.CopyTo(fileStream);
            }

            _context.Add(document);
            _context.SaveChanges();

            return document.Id;
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
