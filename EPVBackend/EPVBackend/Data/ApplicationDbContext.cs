using Microsoft.EntityFrameworkCore;
using EPVBackend.Model;
using EPVBackend.Model.Initialisation;
namespace EPVBackend.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Produit> Produits { get; set; }
        public DbSet<Utilisateur> Utilisateur { get; set; }
        public DbSet<MoyenPaiement> MoyenPaiement { get; set; }
        public DbSet<ModeReglement> ModeReglement { get; set; }
    }
}
