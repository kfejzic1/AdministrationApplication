using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.Voucher
{
    public class Voucher
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public Currency Currency { get; set; }
        public string CurrencyId { get; set; }
        public string Code { get; set; }
        public VoucherStatus VoucherStatus { get; set; }
        public string VoucherStatusId { get; set; }
        public User Admin { get; set; }
        public string CreatedBy { get; set; }
        public User? User { get; set; }
        public string? RedeemedBy { get; set; }

    }
}
