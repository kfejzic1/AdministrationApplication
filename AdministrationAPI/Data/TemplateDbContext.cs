using Microsoft.EntityFrameworkCore;
using AdministrationAPI.Models;

namespace AdministrationAPI.Data
{
    public class TemplateDbContext : DbContext
    {
        public TemplateDbContext(DbContextOptions<TemplateDbContext> options) : base(options)
        {

        }

        public DbSet<Template> Templates { get; set; }
    }
}
