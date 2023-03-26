using AdministrationAPI.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DBContext
{
    public class MyDbContext : DbContext
    {
        private readonly IConfiguration _config;

        public MyDbContext(IConfiguration config)
        {
            _config = config;
        }

        public DbSet<Vendor> Vendors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(_config.GetConnectionString("ConnectionStrings:DbConnection"));
        }
    }
}
