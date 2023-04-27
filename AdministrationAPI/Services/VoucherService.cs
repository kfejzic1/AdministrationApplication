using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
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

        public async void CreateVoucher(VoucherRequest voucherRequest)
        {
            Voucher voucer = new Voucher();
            voucer.Code =  await GenerateOneTimeCode();
            voucer.Amount = voucherRequest.Amount;
            voucer.CurrencyName = voucherRequest.CurrencyName;
            voucer.CurrentStatus = Voucher.Status.ISSUED;
            _context.Vouchers.Add(voucer);
            _context.SaveChanges();
        }

        public Voucher UpdateVoucher(User user, string code)
        {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null)
                {
                    voucher.User = user;
                    voucher.UserId = user.Id;

                    if (voucher.CurrentStatus != Voucher.Status.ISSUED)
                       throw new Exception("Status is not ISSUED");

                    voucher.CurrentStatus = Voucher.Status.ACTIVE;
                }

                _context.SaveChanges();
                return voucher;
        }

        public Voucher RedeemVoucher(User user, string code)
        {
            try
            {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null)
                {
                    voucher.User = user;
                    voucher.UserId = user.Id;

                    if (voucher.CurrentStatus != Voucher.Status.ACTIVE)
                        throw new Exception("Status is not ACTIVE");

                    voucher.CurrentStatus = Voucher.Status.REDEEMED;
                }

                _context.SaveChanges();
                return voucher;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Voucher VoidVoucher(string code)
        {
            try
            {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null && (voucher.CurrentStatus == Voucher.Status.ACTIVE || voucher.CurrentStatus == Voucher.Status.ISSUED))
                {
                    voucher.CurrentStatus = Voucher.Status.VOID;
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
            Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.UserId == userId);
            return voucher;
        }
    }
}
