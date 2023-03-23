using Microsoft.EntityFrameworkCore;

namespace MyProject.Models
{
    public class MyDbContext : DbContext
    {
        public DbSet<Vendor> Vendors { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=sql.freedb.tech;Database=freedb_Amininabaza;User Id=freedb_amina_kurtovic;Password=y#3$?9S4b!JJEUP;");
        }
    }
}