using System.ComponentModel.DataAnnotations;

namespace EPVBackend.Model
{
    public class Produit
    {
        [Key] // la clé primaire
        public string codeBarres { get; set; } = string.Empty;

        [Required] // Le nom est obligatoire
        public string libelle { get; set; } = string.Empty;
        public string pa { get; set; } = string.Empty;
        public string pv { get; set; } = string.Empty;
        public string tva { get; set; } = string.Empty;
    }
}
