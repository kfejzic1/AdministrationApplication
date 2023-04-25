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

        public VoucherService(
          IConfiguration configuration,
          IMapper mapper,
          AppDbContext context)
        {
            _configuration = configuration;
            _mapper = mapper;
            _context = context;
        }

        public async Task<string> GenerateOneTimeCode()
        {
            var random = new Random();
            string code = "";

            for (int i = 0; i < 4; i++) {
                code += Enumerable.Range(0, 4).Select(x => random.Next(10));
                if ( i != 3 ) code += "-";
            }

            //check if code is unique
            var codes = GetVouchersByCode(code);
            if (codes.Count() > 0)
                GenerateOneTimeCode();
            return code;
        }

        public List<Voucher> GetVouchersByCode(string code)
        {
            return _context.Vouchers
            .Where(v => v.Code == code)
            .ToList();
        }
    }
}
