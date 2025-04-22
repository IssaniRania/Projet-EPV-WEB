using EPVBackend.Data;
using Microsoft.AspNetCore.Mvc;
using EPVBackend.Model;
using EPVBackend.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using EPVBackend.Service;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace EPVBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class ControllerAuth : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;
        public ControllerAuth(ApplicationDbContext context, IEmailService emailService, IConfiguration configuration)
        {
            _context = context;
            _emailService = emailService;
            _configuration = configuration;
        }
        //[HttpPost("login")]
        //public IActionResult Login([FromBody] LoginRequest request)
        //{
        //    var utilisateur = _context.Utilisateur
        //        .FirstOrDefault(u => u.Code == request.Code && u.MotdePasse == request.MotdePasse && u.Actif);

        //    if (utilisateur == null)
        //    {
        //        return Unauthorized(new { message = "Code ou mot de passe incorrect ou compte inactif." });
        //    }

        //    return Ok(new
        //    {
        //        utilisateur.Code,
        //        utilisateur.Libelle,
        //        utilisateur.TypeUtilisateur,
        //        utilisateur.NomProfil,
        //        utilisateur.NomPvente
        //    });
        //}

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var utilisateur = _context.Utilisateur
                .FirstOrDefault(u => u.Code == request.Code && u.MotdePasse == request.MotdePasse && u.Actif);

            if (utilisateur == null || !utilisateur.Actif)
            {
                return Unauthorized(new { message = "Code ou mot de passe incorrect ou compte inactif." });
            }

            // Vérification de la clé JWT dans la configuration
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrEmpty(jwtKey))
            {
                return Unauthorized(new { message = "La clé JWT est manquante dans la configuration." });
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Créer les claims pour le JWT
            var claims = new[]
            {
        new Claim(ClaimTypes.NameIdentifier, utilisateur.Id.ToString()),  // Assure-toi que l'ID est bien sous forme de chaîne
        new Claim(ClaimTypes.Name, utilisateur.Libelle),
        new Claim(ClaimTypes.Email, utilisateur.Email),
        new Claim(ClaimTypes.Role, utilisateur.NomProfil),
        new Claim("NomProfil", utilisateur.NomProfil ?? ""),
        new Claim("NomPvente", utilisateur.NomPvente ?? "")
    };

            // Générer le token JWT
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: creds
            );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            // Retourner le token et les infos de l'utilisateur
            return Ok(new LoginResponse
            {
                Token = jwt,
                Code = utilisateur.Code,
                Libelle = utilisateur.Libelle,
                Email=utilisateur.Email,
                NomProfil = utilisateur.NomProfil ?? "Administrateur"

            });
        }
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            // Supprimer le cookie contenant le token
            Response.Cookies.Delete("authToken");

            return Ok(new { message = "Déconnexion réussie." });
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
        [HttpPost("configure")]
        public IActionResult ConfigureEmailSettings([FromBody] EmailSettings emailSettings)
        {
            // Configure le service d'email avec les paramètres reçus
            _emailService.ConfigureEmailSettings(emailSettings);
            return Ok("Email settings configured successfully.");
        }

        [HttpPost("send-reset-code")]
        public async Task<IActionResult> SendResetCode([FromBody] ResetPasswordRequest request)

        {
            var utilisateur = _context.Utilisateur.FirstOrDefault(u => u.Email == request.Email);
            if (utilisateur == null)
            {
                return NotFound(new { message = "Utilisateur non trouvé." });
            }

            // Générer un code aléatoire
            var resetCode = Guid.NewGuid().ToString().Substring(0, 6); // Code aléatoire

            // Sauvegarder le code dans la base de données ou en mémoire pour vérification
            utilisateur.ResetToken = resetCode;
            utilisateur.ResetTokenExpiry = DateTime.Now.AddMinutes(10); // Code valable 10 minutes
            _context.SaveChanges();

            // Envoi du code de réinitialisation par email
            var message = $"Voici votre code de réinitialisation : {resetCode}";
            try
            {
                Console.WriteLine("Email envoyé à : " + request.Email);
                await _emailService.SendEmailAsync(request.Email!, "Réinitialisation de mot de passe", message);
                Console.WriteLine("email envoyé.");
            }
            catch (Exception ex)
            {
                Console.WriteLine("ERREUR INTERNE : " + ex.ToString());
                return StatusCode(500, new { message = "Erreur lors de l'envoi de l'email", erreur = ex.Message });
            }


            return Ok(new { message = "Un code de réinitialisation a été envoyé à votre email." });
        }

        [HttpPost("verify-reset-code")]
        public IActionResult VerifyResetCode([FromBody] VerifyResetCodeRequest request)
        {
            var utilisateur = _context.Utilisateur.FirstOrDefault(u => u.Email == request.Email);
            if (utilisateur == null || utilisateur.ResetToken != request.Code || utilisateur.ResetTokenExpiry < DateTime.Now)
            {
                return BadRequest(new { message = "Code de réinitialisation invalide ou expiré." });
            }

            return Ok(new { message = "Code vérifié avec succès." });
        }

        [HttpPost("reset-password")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var utilisateur = _context.Utilisateur.FirstOrDefault(u => u.Email == request.Email);
            if (utilisateur == null)
            {
                return NotFound(new { message = "Utilisateur introuvable." });
            }

            utilisateur.MotdePasse = request.NewPassword; // Hasher le mot de passe avant de le sauvegarder
            _context.SaveChanges();

            return Ok(new { message = "Mot de passe mis à jour avec succès." });
        }



    }
}



