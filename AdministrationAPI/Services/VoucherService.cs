using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
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
            voucer.CurrencyName = voucherRequest.Name;
            voucer.CurrentStatus = 0;
            _context.Vouchers.Add(voucer);
            _context.SaveChanges();
        }

  
    }
}
