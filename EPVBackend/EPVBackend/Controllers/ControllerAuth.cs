using EPVBackend.Data;
using Microsoft.AspNetCore.Mvc;
using EPVBackend.Model;
using EPVBackend.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
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

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Utilisateur user)
        {
            if (string.IsNullOrWhiteSpace(user.Code) || string.IsNullOrWhiteSpace(user.Libelle) || string.IsNullOrWhiteSpace(user.MotdePasse))
                return BadRequest("Code, Libelle et MotDePasse sont obligatoires");

            // Vérification si utilisateur existe déjà (facultatif)
            var existe = await _context.Utilisateur.AnyAsync(u => u.Code == user.Code);
            if (existe)
                return Conflict("Un utilisateur avec ce Code existe déjà.");

           // user.Actif = true;
            user.CodeProfil = "01";
            user.NomProfil = "Administrateur";
           // user.MotdePasse = BCrypt.Net.BCrypt.HashPassword(user.MotdePasse);

            _context.Utilisateur.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Utilisateur créé avec succès" });
        }




    }
}



