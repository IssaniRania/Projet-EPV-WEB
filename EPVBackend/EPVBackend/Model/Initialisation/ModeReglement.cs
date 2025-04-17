using System.ComponentModel.DataAnnotations;

namespace EPVBackend.Model.Initialisation
{
    public class ModeReglement
    {
        [Key] // la clé primaire
        public string Code { get; set; } = string.Empty;

        [Required] // Le nom est obligatoire
        public string Libelle { get; set; } = string.Empty;
        public string MoyenPaiement { get; set; } = string.Empty;
        public bool Tiroir { get; set; } = false;

    }
}
