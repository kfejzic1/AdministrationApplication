using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using AdministrationAPI.Models.Vendor;
namespace AdministrationAPI.Models.EInvoiceForms
{
    public class EInvoiceRequest
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int EInvoiceRequestId { get; set; }
        [ForeignKey("User")]
        public string UserId { get; set; }
        public User User { get; set; }
        [ForeignKey("Vendor")]
        public int VendorId { get; set; }
        public Vendors Vendor { get; set; }
        public int Status { get; set; }
        public string? Param1 { get; set; }
        public string? Param2 { get; set; }
        public string? Param3 { get; set; }
        public string? Param4 { get; set; }
    }

}