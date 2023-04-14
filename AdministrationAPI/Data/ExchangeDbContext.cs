using System;
using Microsoft.EntityFrameworkCore;


public class ExchangeDbContext : DbContext
{
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ExchangeRate>()
            .HasOne<Currency>(er => er.InputCurrency)
            .WithMany(c => c.ExchangeRates)
            .HasForeignKey(er => er.InputCurrencyId);
        modelBuilder.Entity<ExchangeRate>()
            .HasOne<Currency>(er => er.OutputCurrency)
            .WithMany(c => c.ExchangeRates)
            .HasForeignKey(er => er.OutputCurrencyId);
    }

    public DbSet<ExchangeRate> ExchangeRates { get; set; }
    public DbSet<Currency> Currencies { get; set; }




}
