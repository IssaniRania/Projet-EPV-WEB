using EPVBackend.Model.Initialisation;
using Microsoft.EntityFrameworkCore;

namespace EPVBackend.Data
{
    public static class DbInitializer
    {
        public static void Initialize(ApplicationDbContext context)
        {
            context.Database.Migrate(); // Assure-toi que la DB est créée et à jour

            if (!context.MoyenPaiement.Any())
            {
                var modes = new List<MoyenPaiement>
                {
                    new MoyenPaiement { Code = "01", Libelle = "CASH" },
                    new MoyenPaiement { Code = "02", Libelle = "Scripturaux (Chèque, Effet, ...)" },
                    new MoyenPaiement { Code = "03", Libelle = "Electronique" },
                    new MoyenPaiement { Code = "04", Libelle = "Autres" }
                };

                context.MoyenPaiement.AddRange(modes);
                context.SaveChanges();
            }
        }
    }
}
