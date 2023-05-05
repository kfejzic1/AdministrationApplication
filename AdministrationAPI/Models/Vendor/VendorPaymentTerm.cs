using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.Vendor
{
    public class VendorPaymentTerm
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string Name { get; set; }
        public int VendorId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public int InvoiceFrequencyTypeId { get; set; }
        public List<Document>? Contracts { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }

        public VendorPaymentTerm()
        {
            Name = string.Empty;
            InvoiceFrequencyTypeId = -1;
            Contracts= new List<Document>();
        }
    }
}
