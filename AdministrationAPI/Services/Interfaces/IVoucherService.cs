using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVoucherService
    {
        public Task<string> GenerateOneTimeCode();
        public void CreateVoucher(VoucherRequest voucherRequest);
        public Voucher GetVoucherByCode(string code);
        public Voucher GetVoucherByUserId(string userId);
        public Voucher UpdateVoucher(User user, string code);
        public Voucher RedeemVoucher(User user, string code);
        public Voucher VoidVoucher(string code);
    }
}
