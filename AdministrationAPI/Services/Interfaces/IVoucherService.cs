using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Voucher;
using Microsoft.AspNetCore.Mvc;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IVoucherService
    {
        public Task<string> GenerateOneTimeCode();
        public Task<Voucher> CreateVoucher(VoucherRequest voucherRequest, string createdBy);
        public Voucher GetVoucherByCode(string code);
        public Voucher GetVoucherByUserId(string userId);
        public Voucher ActivateVoucher(string code);
        public Task<Voucher> RedeemVoucher(User user, string code);
        public Task<Voucher> VoidVoucher(string code);
        public Task<List<Voucher>> GetVouchers(string adminId);
    }
}
