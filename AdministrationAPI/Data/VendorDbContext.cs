using AdministrationAPI.Models;
using AdministrationAPI.Models.Vendor;
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
        public DbSet<VendorLocation> VendorLocations { get; set; }
        public DbSet<VendorPOS> VendorPOS { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<VendorPaymentTermContract> VendorPaymentTermContract { get; set; }
        public DbSet<VendorPaymentTerm> VendorPaymentTerm { get; set; }
        public DbSet<InvoiceFrequency> InvoiceFrequency { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);


            builder.Entity<VendorUser>()
          .HasKey(vu => new { vu.UserId, vu.VendorId });

            builder.Entity<VendorUser>()
                .HasOne(vu => vu.Role)
                .WithMany()
                .HasForeignKey(vu => vu.RoleId);

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
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = "server=localhost\\sqlexpress;Database=vendordb;trusted_connection=true;TrustServerCertificate=True";
            Console.WriteLine("Default connection string: " + connectionString);

            optionsBuilder.UseSqlServer(connectionString, options =>
                options.EnableRetryOnFailure());
        }
    }
}