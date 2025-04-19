using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace EPVBackend.Model
{
    public class Utilisateur
    {
        [Key]
        
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string Code { get; set; } = string.Empty;

        public string Libelle { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;
        [Required] // MotdePasse est obligatoire
        public string MotdePasse { get; set; } = string.Empty;

        public string ? TypeUtilisateur { get; set; } = string.Empty;

        public bool Actif { get; set; } = true;
        public string ? PointdeVente { get; set; } = string.Empty;

        public string ? NomPvente { get; set; } = string.Empty;

        public string CodeProfil { get; set; } = string.Empty;

        public string NomProfil { get; set; } = string.Empty;
    }
}
