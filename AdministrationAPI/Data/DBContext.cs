using AdministrationAPI.Models.Transaction;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions<DBContext> options) : base(options)
        {
            
        }

        public DbSet<Transaction> Transactions => Set<Transaction>();
    }
}