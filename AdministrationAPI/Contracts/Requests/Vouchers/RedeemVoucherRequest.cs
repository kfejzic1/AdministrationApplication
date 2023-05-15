using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Requests.Vouchers
{
    public class RedeemVoucherRequest
    {
        public string Code { get; set; }
    }
}
