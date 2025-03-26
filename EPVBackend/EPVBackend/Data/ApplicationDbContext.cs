using Microsoft.EntityFrameworkCore;
using EPVBackend.Model;

namespace EPVBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Produit> Produits { get; set; } // Table Produits
    }
}
