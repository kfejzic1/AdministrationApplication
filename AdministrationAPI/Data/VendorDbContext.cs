using AdministrationAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.NameTranslation;

namespace AdministrationAPI.Data
{
    public class VendorDbContext : DbContext
    {
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorUser> VendorUsers { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();


            var connectionString = configuration.GetConnectionString("SqliteVendor");

            Console.WriteLine("Default connection string: " + connectionString);


            // optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
            optionsBuilder.UseSqlite(connectionString);
        }
    }
}