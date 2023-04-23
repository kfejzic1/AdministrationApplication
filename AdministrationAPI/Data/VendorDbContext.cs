using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.NameTranslation;
using System.Data;
using System.Reflection.Emit;

namespace AdministrationAPI.Data
{
    public class VendorDbContext : DbContext
    {
        public DbSet<Vendor> Vendors { get; set; }
        public DbSet<VendorRoles> VendorRoles { get; set; }
        public DbSet<VendorUser> VendorUsers { get; set; }
        public DbSet<VendorUserRole> VendorUserRoles { get; set; }
   
        public DbSet<VendorLocation> VendorLocations { get; set; }
        public DbSet<VendorPOS> VendorPOS { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<VendorPaymentTermContract> VendorPaymentTermContract { get; set; }
        public DbSet<VendorPaymentTerm> VendorPaymentTerm { get; set; }
        public DbSet<InvoiceFrequency> InvoiceFrequency { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            //builder.Entity<VendorUser>()
            //   .HasMany(vu => vu.Roles)
            //   .WithMany()
            //   .UsingEntity(j => j.ToTable("VendorUserRoles"));

            Seed(builder);
          
        }
        public static void Seed(ModelBuilder builder)
        {
            List<InvoiceFrequency> invoiceFrequencies = new List<InvoiceFrequency>()
            {
                new InvoiceFrequency() { Id = 1, Name = "Monthly", FrequencyDays = 30 },
                new InvoiceFrequency() { Id = 2, Name = "Weekly", FrequencyDays = 7 },
                new InvoiceFrequency() { Id = 3, Name = "Biweekly", FrequencyDays = 14 },
            };

            builder.Entity<InvoiceFrequency>().HasData(invoiceFrequencies);
            SeedRoles(builder);
        }

        private static void SeedRoles(ModelBuilder builder)
        {
            builder.Entity<VendorRoles>().HasData(
                new VendorRoles { Id = Guid.NewGuid(), Name = "VendorAdmin" , NormalizedName="VENDORADMIN" , ConcurrencyStamp = "1"},
                new VendorRoles { Id = Guid.NewGuid(), Name = "VendorUser", NormalizedName = "VENDORUSER", ConcurrencyStamp = "2" },
                new VendorRoles { Id = Guid.NewGuid(), Name = "VendorRestricted", NormalizedName = "VENDORRESTRICTED", ConcurrencyStamp = "3" }
            );
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
            .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
            .AddJsonFile("appsettings.json")
            .Build();

            var connectionString = configuration.GetConnectionString("DefaultConnectionString");

            Console.WriteLine("Default connection string: " + connectionString);

            optionsBuilder.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString));
        }
    }
}