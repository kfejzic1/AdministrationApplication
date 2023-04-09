using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IDocumentService
    {
        public int UploadDocument(MemoryStream file, int paymentTermId, Document document);
        public Document GetDocument(int id);
        public List<Document> GetAllDocuments();
        public bool DocumentDelete(int id);

    }
}
