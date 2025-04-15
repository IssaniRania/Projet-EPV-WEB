using EPVBackend.Data;
using Microsoft.AspNetCore.Mvc;
using EPVBackend.Model;
using EPVBackend.DTOs;
namespace EPVBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class ControllerAuth : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public ControllerAuth(ApplicationDbContext context)
        {
            _context = context;
        }
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var utilisateur = _context.Utilisateur
                .FirstOrDefault(u => u.Code == request.Code && u.MotdePasse == request.MotdePasse && u.Actif);

            if (utilisateur == null)
            {
                return Unauthorized(new { message = "Code ou mot de passe incorrect ou compte inactif." });
            }

            return Ok(new
            {
                utilisateur.Code,
                utilisateur.Libelle,
                utilisateur.TypeUtilisateur,
                utilisateur.NomProfil,
                utilisateur.NomPvente
            });
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var utilisateur = _context.Utilisateur.FirstOrDefault(u => u.Code == request.Code);

            if (utilisateur == null)
            {
                return NotFound(new { message = "Utilisateur introuvable." });
            }

            utilisateur.MotdePasse = request.NewPassword;
            _context.SaveChanges();

            return Ok(new { message = "Mot de passe mis à jour avec succès." });
        }


    }
}



