using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Requests.Vendors
{
    public class PaymentTermRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int InvoiceFrequencyTypeId { get; set; }
        public List<int> DocumentIds { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }
        public int VendorId { get; set; }

        public PaymentTermRequest() 
        {
            DocumentIds = new List<int>();
        }
    }
}
