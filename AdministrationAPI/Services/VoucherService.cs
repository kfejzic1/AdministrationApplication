using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using MimeKit.Encodings;
using System.Linq;
using System.Text;

namespace AdministrationAPI.Services
{
    public class VoucherService : IVoucherService
    {

        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly AppDbContext _context;
        private readonly IUserService _userService;

        public VoucherService(
          IConfiguration configuration,
          IMapper mapper,
          AppDbContext context, 
          IUserService userService)
        {
            _configuration = configuration;
            _mapper = mapper;
            _context = context;
            _userService = userService;
        }

        /*
        public List<Voucher> GetVouchersByCode(string code)
        {
            return _context.Vouchers
            .Where(v => v.Code == code)
            .ToList();
        }
        */
        public async Task<string> GenerateOneTimeCode()
        {

            var random = new Random();
            //string code = "";

            /*
            for (int i = 0; i < 4; i++) {
                //treba dodati da mogu biti i slova
                code += Enumerable.Range(0, 4).Select(x => random.Next(10));
                if ( i != 3 ) code += "-";
            }
            */

            // Define a string of characters to use for the one-time code
            string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            // Initialize a random number generator
            Random rand = new Random();

            // Generate a random 4x4 one-time code
            StringBuilder code = new StringBuilder();
            for (int i = 0; i < 4; i++)
            {
                for (int j = 0; j < 4; j++)
                {
                    code.Append(chars[rand.Next(chars.Length)]);
                }
                code.Append("-");
            }
            code.Remove(code.Length - 1, 1); // Remove the last hyphen

            // Output the one-time code
            Console.WriteLine(code);


            //check if code is unique
            //var codes = GetVouchersByCode(code);
            // if (codes.Count() > 0)
            // await GenerateOneTimeCode();
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

        // async ?
        public void UpdateVoucher(User user, string code)
        {
            try
            {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null)
                {
                    voucher.User = user;
                    voucher.UserId = user.Id;

                    if (voucher.CurrentStatus != Voucher.Status.ISSUED)
                       throw new Exception("Status is not ISSUED");
                    //napraviti da bude status 400 
                   


                    voucher.CurrentStatus = Voucher.Status.ACTIVE;
                }

                _context.SaveChanges();
            }catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void RedeemVoucher(User user, string code)
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
                    //napraviti da bude status 400 



                    voucher.CurrentStatus = Voucher.Status.REDEEMED;
                }

                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public void VoidVoucher(string code)
        {
            try
            {
                Voucher voucher = _context.Vouchers.FirstOrDefault(u => u.Code == code);
                if (voucher != null && (voucher.CurrentStatus == Voucher.Status.ACTIVE || voucher.CurrentStatus == Voucher.Status.ISSUED))
                {
                    voucher.CurrentStatus = Voucher.Status.VOID;
                }

                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

    }
}
