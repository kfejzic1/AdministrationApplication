using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
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

        public List<Voucher> GetVouchersByCode(string code)
        {
            return _context.Vouchers
            .Where(v => v.Code == code)
            .ToList();
        }

        public async Task<string> GenerateOneTimeCode()
        {

            var random = new Random();
            string code = "";

            for (int i = 0; i < 4; i++) {
                //treba dodati da mogu biti i slova
                code += Enumerable.Range(0, 4).Select(x => random.Next(10));
                if ( i != 3 ) code += "-";
            }

            //check if code is unique
            var codes = GetVouchersByCode(code);
            if (codes.Count() > 0)
               await GenerateOneTimeCode();
            return code;
        }

        public async void CreateVoucher(VoucherRequest voucherRequest)
        {
            Voucher voucer = new Voucher();
            voucer.Code =  await GenerateOneTimeCode();
            voucer.Amount = voucherRequest.Amount;
            voucer.Currency = voucherRequest.Currency;
            voucer.CurrentStatus = Voucher.Status.ISSUED;
            _context.Vouchers.Add(voucer);
            _context.SaveChanges();
        }

  
    }
}
