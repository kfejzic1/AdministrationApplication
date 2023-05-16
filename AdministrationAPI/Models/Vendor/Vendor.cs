using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models.Vendor
{
    public class Vendors
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }

    [Required(ErrorMessage = "Name field is required.")]
    public string Name { get; set; }

    [Required(ErrorMessage = "Address field is required.")]
    public string Address { get; set; }
    public string CompanyDetails { get; set; }

    public string Phone { get; set; }

    public DateTime? Created { get; set; }

    public string? CreatedBy { get; set; }

        public DateTime? Modified { get; set; }
        public int? ModifiedBy { get; set; }
        [DisplayFormat(ConvertEmptyStringToNull = true)]
        public string? Param1 { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = true)]
        public string? Param2 { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = true)]
        public string? Param3 { get; set; }

        [DisplayFormat(ConvertEmptyStringToNull = true)]
        public string? Param4 { get; set; }

        public Vendors()
        {
            Name = string.Empty;
            Address = string.Empty;
            CompanyDetails = string.Empty;
            Phone = string.Empty;
            CreatedBy = string.Empty;
        }
    }
}
