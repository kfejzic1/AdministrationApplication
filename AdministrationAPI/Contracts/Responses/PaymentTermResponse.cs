using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;

namespace AdministrationAPI.Contracts.Responses
{
    public class PaymentTermResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public InvoiceFrequency InvoiceFrequencyType { get; set; }
        public List<Document>? Contracts { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }
    }
}
