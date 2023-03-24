using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdministrationAPI.Models.Transaction;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
            
        }

        public DbSet<Transaction> Transactions => Set<Transaction>();
    }
}