using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Voucher;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Text;

namespace AdministrationAPI.Services
{
    public class VoucherService : IVoucherService
    {

        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IUserService _userService;

        public VoucherService( IConfiguration configuration, IMapper mapper, AppDbContext context, IUserService userService)
        {
            _configuration = configuration;
            _mapper = mapper;
            _context = context;
            _userService = userService;
        }

        public async Task<string> GenerateOneTimeCode()
        {
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            Random rand = new Random();

            StringBuilder code = new StringBuilder();
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    code.Append(chars[rand.Next(chars.Length)]);
                }
                code.Append("-");
            }
            code.Remove(code.Length - 1, 1); 

            return code.ToString();
        }

        public async Task<Voucher> CreateVoucher(VoucherRequest voucherRequest, string createdBy)
        {
            Voucher voucer = new Voucher();
            voucer.Code =  await GenerateOneTimeCode();
            voucer.Amount = voucherRequest.Amount;
            voucer.CurrencyId = voucherRequest.CurrencyId;
            voucer.CreatedBy = createdBy;
            voucer.VoucherStatusId = "0";
            _context.Vouchers.Add(voucer);
            try
            {
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
                throw ex;
            }
            return voucer;
        }

        public Voucher ActivateVoucher(string code)
        {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null)
                {
                    if (voucher.VoucherStatusId != "0")
                       throw new Exception("Status is not ISSUED");

                voucher.VoucherStatusId = "1";
                }

                _context.SaveChanges();
                return voucher;
        }

        public async Task<Voucher> RedeemVoucher(User user, string code)
        {
            try
            {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null)
                {
                    voucher.User = user;
                    voucher.RedeemedBy = user.Id;

                    if (voucher.VoucherStatusId != "1")
                        throw new Exception("Status is not ACTIVE");

                    voucher.VoucherStatusId = "2";
                }

                _context.SaveChanges();
                return voucher;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Voucher> VoidVoucher(string code)
        {
            try
            {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null && (voucher.VoucherStatusId == "1" || voucher.VoucherStatusId == "0"))
                {
                    voucher.VoucherStatusId = "3";
                }
                else throw new Exception("Voucher status is not ISSUED/ACTIVE!");

                _context.SaveChanges();
                return voucher;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Voucher GetVoucherByCode(string code)
        {
            Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
            return voucher;
        }

        
        public Voucher GetVoucherByUserId(string userId)
        {
            Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.RedeemedBy == userId);
            return voucher;
        }

        public Task<List<Voucher>> GetVouchers(string adminUsername)
        {
            var admin = _context.Users.FirstOrDefault(v => v.UserName == adminUsername);
            var vouchers = _context.Vouchers.Where(v => v.CreatedBy == admin.Id).ToListAsync();
            return vouchers;
        }
    }
}
