using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.Vendor
{
    public class VendorPaymentTermContract
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public int PaymentTermId { get; set; }
        public int ContractId { get; set; }
        public VendorPaymentTermContract() { }
    }
}
