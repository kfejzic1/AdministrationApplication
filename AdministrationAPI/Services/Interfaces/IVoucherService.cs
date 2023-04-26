using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVoucherService
    {
        public Task<string> GenerateOneTimeCode();
        public List<Voucher> GetVouchersByCode(string code);
        public void CreateVoucher(VoucherRequest voucherRequest);
    }
}
