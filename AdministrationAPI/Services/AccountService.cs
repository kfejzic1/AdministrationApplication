
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using System.Data;


namespace AdministrationAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly AppDbContext _context;

        public AccountService(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            IConfiguration configuration,
            IMapper mapper,
            RoleManager<IdentityRole> roleManager,
            AppDbContext context
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
            _mapper = mapper;
            _roleManager = roleManager;
            _context = context;
        }
        public List<Account> GetAccountsForUser(string userId)
        {
            return _context.Accounts.Where(a => a.UserId == userId).ToList();
        }
        public List<Account> GetAccountsForUserName(string userName)
        { //ovo ne radi
            /*var user = _context.Users.FirstOrDefault(u => u.UserName == userName);
            if (user == null)*/
            return new List<Account>();
            // return _context.Accounts.Where(a => a.UserId == user.Id).ToList();
        }
        public string getIdFromUsername(string userName)
        {
            var user = _context.Users.FirstOrDefault(u => u.UserName == userName);
            if (user == null)
                return null;
            return user.Id;
        }




    }
}