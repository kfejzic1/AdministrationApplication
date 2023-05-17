using AdministrationAPI.Models;
using AdministrationAPI.Models.EInvoice;
using AdministrationAPI.Models.EInvoiceForms;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Models.Voucher;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Npgsql.NameTranslation;
using System.Reflection.Emit;

namespace AdministrationAPI.Data
{
    public class AppDbContext : IdentityDbContext<User>
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

        // Seed Roles

        public DbSet<ExchangeRate> ExchangeRates { get; set; }
        public DbSet<Currency> Currencies { get; set; }
        public DbSet<EmailActivationCode> EmailActivationCodes { get; set; }
        public DbSet<SMSActivationCode> SMSActivationCodes { get; set; }
        public DbSet<TokenValidity> TokenValidities { get; set; }
        public DbSet<Vendors> Vendors { get; set; }
        public DbSet<VendorUser> VendorUsers { get; set; }
        public DbSet<VendorLocation> VendorLocations { get; set; }
        public DbSet<VendorPOS> VendorPOS { get; set; }
        public DbSet<VendorRoles> VendorRoles { get; set; }
        public DbSet<VendorUserRole> VendorUserRoles { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<VendorPaymentTermContract> VendorPaymentTermContract { get; set; }
        public DbSet<VendorPaymentTerm> VendorPaymentTerm { get; set; }
        public DbSet<InvoiceFrequency> InvoiceFrequency { get; set; }
        public DbSet<TransactionClaim> TransactionClaims { get; set; }
        public DbSet<TransactionClaimDocument> TransactionClaimDocuments { get; set; }
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Voucher> Vouchers { get; set; }
        public DbSet<VoucherStatus> VoucherStatuses { get; set; }

    public DbSet<AccountCreationRequest> AccountCreationRequests { get; set; }

    public DbSet<TransactionClaimUser> TransactionClaimUsers { get; set; }
    public DbSet<TransactionClaimMessage> TransactionClaimMessages { get; set; }
    public DbSet<ClaimsMessagesDocuments> ClaimsMessagesDocuments { get; set; }
    public DbSet<EInvoiceRequest> EInvoiceRequests { get; set; }

    public DbSet<EInvoice> EInvoices { get; set; }
    public DbSet<EInvoiceLog> EInvoiceLogs { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

            builder.Entity<User>(entity => { entity.ToTable(name: "usr_users"); });
            builder.Entity<IdentityRole>(entity => { entity.ToTable(name: "usr_roles"); });
            builder.Entity<IdentityUserRole<string>>(entity => { entity.ToTable("usr_user_roles"); });
            builder.Entity<IdentityUserClaim<string>>(entity => { entity.ToTable("usr_user_claims"); });
            builder.Entity<IdentityUserLogin<string>>(entity => { entity.ToTable("usr_user_logins"); });
            builder.Entity<IdentityUserToken<string>>(entity => { entity.ToTable("usr_user_tokens"); });
            builder.Entity<IdentityRoleClaim<string>>(entity => { entity.ToTable("usr_role_claims"); });
            builder.Entity<EmailActivationCode>(entity => { entity.ToTable("usr_email_activation_codes"); });
            builder.Entity<SMSActivationCode>(entity => { entity.ToTable("usr_sms_activation_codes"); });
            builder.Entity<TokenValidity>(entity => { entity.ToTable("usr_token_validities"); });
            builder.Entity<Account>(entity => { entity.ToTable("usr_accounts"); });
            builder.Entity<AccountCreationRequest>(entity => { entity.ToTable("usr_account_creation_requests"); });
            builder.Entity<Vendors>(entity => { entity.ToTable("ven_vendors"); });
            builder.Entity<VendorUser>(entity => { entity.ToTable("ven_vendor_user"); });
            builder.Entity<VendorUserRole>(entity => { entity.ToTable("ven_vendor_user_roles"); });
            builder.Entity<VendorRoles>(entity => { entity.ToTable("ven_vendor_roles"); });
            builder.Entity<VendorLocation>(entity => { entity.ToTable("ven_vendor_location"); });
            builder.Entity<VendorPOS>(entity => { entity.ToTable("ven_vendor_pos"); });
            builder.Entity<Document>(entity => { entity.ToTable("dm_documents"); });
            builder.Entity<VendorPaymentTermContract>(entity => { entity.ToTable("ven_payment_term_contract"); });
            builder.Entity<VendorPaymentTerm>(entity => { entity.ToTable("ven_payment_term"); });
            builder.Entity<InvoiceFrequency>(entity => { entity.ToTable("ven_invoice_frequency"); });
            builder.Entity<TransactionClaim>(entity => { entity.ToTable("trn_claim"); });
            builder.Entity<TransactionClaimDocument>(entity => { entity.ToTable("trn_claim_document"); });
            builder.Entity<Voucher>(entity => { entity.ToTable("vou_vouchers"); });
            builder.Entity<VoucherStatus>(entity => { entity.ToTable("vou_voucher_stasuses"); });
            builder.Entity<TransactionClaimUser>(entity => { entity.ToTable("trn_claim_user"); });
            builder.Entity<TransactionClaimMessage>(entity => { entity.ToTable("trn_claim_message"); });
            builder.Entity<ClaimsMessagesDocuments>(entity => { entity.ToTable("trn_claim_messages_documents"); });
            builder.Entity<EInvoiceRequest>(entity => { entity.ToTable("einvoicerequests"); });


      ApplySnakeCaseNames(builder);

            builder.Entity<User>()
                .HasMany(u => u.Accounts)
                .WithOne(a => a.User)
                .HasForeignKey(a => a.UserId);

      /*builder.Entity<Account>()
          .HasMany(u => u.Documents)
          //.WithOne(d => d.Id)
          .HasForeignKey(a => a.AccountId);*/

      builder.Entity<EmailActivationCode>()
          .HasOne(rc => rc.User)
          .WithOne(u => u.EmailActivationCode)
          .HasForeignKey<EmailActivationCode>(rc => rc.UserId);

      builder.Entity<SMSActivationCode>()
          .HasOne(rc => rc.User)
          .WithOne(u => u.SMSActivationCode)
          .HasForeignKey<SMSActivationCode>(rc => rc.UserId);

      builder.Entity<ExchangeRate>()
          .HasOne<Currency>(er => er.InputCurrency)
          .WithMany(c => c.ExchangeRatesAsInput)
          .HasForeignKey(er => er.InputCurrencyId);

      builder.Entity<ExchangeRate>()
          .HasOne<Currency>(er => er.OutputCurrency)
          .WithMany(c => c.ExchangeRatesAsOutput)
          .HasForeignKey(er => er.OutputCurrencyId);


      builder.Entity<Voucher>()
         .HasIndex(e => e.Code)
         .IsUnique();


      builder.Entity<Voucher>()
          .HasOne(v => v.Admin)
          .WithMany()
          .HasForeignKey(v => v.CreatedBy);

      builder.Entity<Voucher>()
          .HasOne(v => v.User)
          .WithMany()
          .HasForeignKey(v => v.RedeemedBy);

      builder.Entity<Voucher>().
          HasOne(v => v.Currency)
          .WithMany()
          .HasForeignKey(v => v.CurrencyId);

            builder.Entity<Voucher>()
                .HasOne(v => v.VoucherStatus)
                .WithMany()
                .HasForeignKey(v => v.VoucherStatusId);

            Seed(builder);
        }




        private void ApplySnakeCaseNames(ModelBuilder modelBuilder)
        {
            var mapper = new NpgsqlSnakeCaseNameTranslator();

      foreach (var entity in modelBuilder.Model.GetEntityTypes())
      {
        foreach (var property in entity.GetProperties())
        {
          var npgsqlColumnName = mapper.TranslateMemberName(property.GetColumnName());

          property.SetColumnName(npgsqlColumnName);
        }
      }
    }
    public static void Seed(ModelBuilder builder)
    {

      // Seed Roles

            List<IdentityRole> roles = new List<IdentityRole>()
                {
                    new IdentityRole() { Name = "Admin", ConcurrencyStamp = "1", NormalizedName = "ADMIN" },
                    new IdentityRole() { Name = "User", ConcurrencyStamp = "2", NormalizedName = "USER" },
                    new IdentityRole() { Name = "Restricted", ConcurrencyStamp = "3", NormalizedName = "RESTRICTED" }
                };

      builder.Entity<IdentityRole>().HasData(roles);


            List<VoucherStatus> voucherStatuses = new List<VoucherStatus>() {
                       new VoucherStatus { Id = "1", Status = "ISSUED" },
                       new VoucherStatus { Id = "2", Status = "ACTIVE" },
                       new VoucherStatus { Id = "3", Status = "REDEEMED" },
                       new VoucherStatus { Id = "4", Status = "VOID" }
                       };

      builder.Entity<VoucherStatus>().HasData(voucherStatuses);


      // Seed Users

            List<User> users = new List<User>()
                {
                    new User() { FirstName = "Testing", LastName = "User", UserName = "testingUser", NormalizedUserName = "TESTINGUSER", ConcurrencyStamp = "1", Email = "kfejzic1@etf.unsa.ba", NormalizedEmail = "KFEJZIC1@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "062229993", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = true, LockoutEnabled = false },
                    new User() { FirstName = "Admin", LastName = "User", UserName = "adminUser", NormalizedUserName = "ADMINUSER", ConcurrencyStamp = "1", Email = "fejza2806@gmail.com", NormalizedEmail = "FEJZA2806@GMAIL.COM", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "062518214", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = false, LockoutEnabled = false },
                    new User() { FirstName = "Elvedin", LastName = "Smajic", UserName = "esmajic2", NormalizedUserName = "ESMAJIC2", ConcurrencyStamp = "1", Email = "esmajic2@etf.unsa.ba", NormalizedEmail = "ESMAJIC2@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "11111", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = true, LockoutEnabled = false },
                    new User() { FirstName = "Admir", LastName = "Mehmedagic", UserName = "amehmedagi1", NormalizedUserName = "AMEHMEDAGI1", ConcurrencyStamp = "1", Email = "amehmedagi1@etf.unsa.ba", NormalizedEmail = "AMEHMEDAGI1@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "11111", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = true, LockoutEnabled = false },
                    new User() { FirstName = "Merjem", LastName = "Becirovic", UserName = "mbecirovic3", NormalizedUserName = "MBECIROVIC3", ConcurrencyStamp = "1", Email = "mbecirovic3@etf.unsa.ba", NormalizedEmail = "MBECIROVIC3@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "11111", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = true, LockoutEnabled = false },
                    new User() { FirstName = "Dzenis", LastName = "Muhic", UserName = "dmuhic1", NormalizedUserName = "DMUHIC1", ConcurrencyStamp = "1", Email = "dmuhic1@etf.unsa.ba", NormalizedEmail = "DMUHIC1@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "11111", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = true, LockoutEnabled = false },
                    new User() { FirstName = "Ema", LastName = "Mekic", UserName = "emekic2", NormalizedUserName = "EMEKIC2", ConcurrencyStamp = "1", Email = "emekic2@etf.unsa.ba", NormalizedEmail = "EMEKIC2@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "11111", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = true, LockoutEnabled = false },
                    new User() { FirstName = "Almina", LastName = "Brulic", UserName = "abrulic1", NormalizedUserName = "ABRULIC1", ConcurrencyStamp = "1", Email = "abrulic1@etf.unsa.ba", NormalizedEmail = "ABRULIC1@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAENao66CqvIXroh/6aTaoJ/uThFfjLemBtjLfuiJpP/NoWXkhJO/G8wspnWhjLJx9WQ==", PhoneNumber = "11111", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = true, LockoutEnabled = false },
                    new User() { FirstName = "Elvir", LastName = "Vlahovljak", UserName = "evlahovlja1", NormalizedUserName = "EVLAHOVLJA1", ConcurrencyStamp = "1", Email = "evlahovlja1@etf.unsa.ba", NormalizedEmail = "EVLAHOVLJA1@ETF.UNSA.BA", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAEL+9sxZQaY0F4wxS0N24IGTB+z6oIeFEX8wQgqdzsskd4XC/oE+2YWgxc/LwTsx+dw==", PhoneNumber = "061904086", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = false, LockoutEnabled = false },
        new User() { Id = "ID", FirstName = "Test", LastName = "Test", UserName = "test", NormalizedUserName = "TEST", ConcurrencyStamp = "1", Email = "test@gmail.com", NormalizedEmail = "TEST@GMAIL.COM", EmailConfirmed = true, PasswordHash = "AQAAAAIAAYagAAAAEL+9sxZQaY0F4wxS0N24IGTB+z6oIeFEX8wQgqdzsskd4XC/oE+2YWgxc/LwTsx+dw==", PhoneNumber = "12345", PhoneNumberConfirmed = true, Address = "Tamo negdje 1", TwoFactorEnabled = false, LockoutEnabled = false }

                };


      builder.Entity<User>().HasData(users);


      // Seed UserRoles
      List<IdentityUserRole<string>> userRoles = new List<IdentityUserRole<string>>();

      foreach (var user in users)
      {
        if (user.UserName != "abrulic1")
          userRoles.Add(new IdentityUserRole<string>
          {
            UserId = user.Id,
            RoleId = roles.First(q => q.Name == "User").Id
          });
        else
          userRoles.Add(new IdentityUserRole<string>
          {
            UserId = user.Id,
            RoleId = roles.First(q => q.Name == "Admin").Id
          });
      }


      builder.Entity<IdentityUserRole<string>>().HasData(userRoles);


            //Seed InvoiceFrequency
            List<InvoiceFrequency> invoiceFrequencies = new List<InvoiceFrequency>()
                {
                    new InvoiceFrequency() { Id = 1, Name = "Monthly", FrequencyDays = 30 },
                    new InvoiceFrequency() { Id = 2, Name = "Weekly", FrequencyDays = 7 },
                    new InvoiceFrequency() { Id = 3, Name = "Biweekly", FrequencyDays = 14 },
                };

      builder.Entity<InvoiceFrequency>().HasData(invoiceFrequencies);

      //Seed VendorRoles

      builder.Entity<VendorRoles>().HasData(
        new VendorRoles { Id = Guid.NewGuid(), Name = "VendorAdmin", NormalizedName = "VENDORADMIN", ConcurrencyStamp = "1" },
        new VendorRoles { Id = Guid.NewGuid(), Name = "VendorUser", NormalizedName = "VENDORUSER", ConcurrencyStamp = "2" },
        new VendorRoles { Id = Guid.NewGuid(), Name = "VendorRestricted", NormalizedName = "VENDORRESTRICTED", ConcurrencyStamp = "3" }
    );


            // Seed Currencies
            List<Currency> currencies = new List<Currency>()
                {
                    new Currency() { Id = Guid.NewGuid().ToString(), Country = "BIH", Name = "BAM" },
                    new Currency() { Id = Guid.NewGuid().ToString(), Country = "USA", Name = "USD" },
                    new Currency() { Id = Guid.NewGuid().ToString(), Country = "DEU", Name = "EUR" },
                    new Currency() { Id = Guid.NewGuid().ToString(), Country = "SWI", Name = "CHF" }
                };

      builder.Entity<Currency>().HasData(currencies);

            // Seed Accounts
            List<Account> accounts = new List<Account>()
                {
                    new Account(){Id = -1, UserId = users[0].Id, CurrencyId = currencies[0].Id, AccountNumber = "1", Description = "Acc1"},
                    new Account(){Id = -2, UserId = users[0].Id, CurrencyId = currencies[1].Id, AccountNumber = "2", Description = "Acc2"},
                    new Account(){Id = -3, UserId = users[1].Id, CurrencyId = currencies[0].Id, AccountNumber = "3", Description = "Acc3"}
                };
            builder.Entity<Account>().HasData(accounts);


      //Seed Vouchers
      List<Voucher> vouchers = new List<Voucher>()
            {
                new Voucher() { Id = 1, Amount = 50, CurrencyId = currencies[0].Id, Code = "12fg-4g2z-4gs2-gs35", VoucherStatusId = "1", CreatedBy = users[7].Id},
                new Voucher() { Id = 2, Amount = 20, CurrencyId = currencies[1].Id, Code = "FDg4-DG4A-HS5A-HA36", VoucherStatusId = "1", CreatedBy = users[7].Id},
                new Voucher() { Id = 3, Amount = 50, CurrencyId = currencies[2].Id, Code = "LLL4-GTA3-g4st-35h5", VoucherStatusId = "2", CreatedBy = users[7].Id},
                new Voucher() { Id = 4, Amount = 50, CurrencyId = currencies[3].Id, Code = "kg45-fkai-3k5f-ek1f", VoucherStatusId = "3", CreatedBy = users[7].Id, RedeemedBy = users[6].Id}
            };

      builder.Entity<Voucher>().HasData(vouchers);


    }

  }
}
