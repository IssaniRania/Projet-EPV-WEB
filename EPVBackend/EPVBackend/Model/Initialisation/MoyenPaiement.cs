using System.ComponentModel.DataAnnotations;

namespace EPVBackend.Model.Initialisation
{
	public class MoyenPaiement
	{
		[Key] // la clé primaire
		public string Code { get; set; } = string.Empty;

		[Required] // Le nom est obligatoire
		public string Libelle { get; set; } = string.Empty;
	}
}
