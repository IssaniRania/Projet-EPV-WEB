namespace EPVBackend.DTOs
{
    public class LoginResponse
    {
        public string Token { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string Libelle { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string TypeUtilisateur { get; set; } = string.Empty;
        public string NomProfil { get; set; } = string.Empty;
        public string NomPvente { get; set; } = string.Empty;
    }
}