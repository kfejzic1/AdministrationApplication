using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Requests.Vouchers
{
    public class VoucherRequest
    {
        public int NoVouchers { get; set; }
        public int Amount { get; set; }
        public string CurrencyId { get; set; }
    }
}
