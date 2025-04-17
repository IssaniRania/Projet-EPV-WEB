using EPVBackend.Data;
using Microsoft.AspNetCore.Mvc;
using EPVBackend.Model.Initialisation;
using EPVBackend.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
namespace EPVBackend.Controllers.Initialisation
{
    [Route("api/Initialisation")]
    [ApiController]
    public class MoyenPaiementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MoyenPaiementController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Récupère tous les produits depuis la base de données
            var produits = await _context.MoyenPaiement.ToListAsync();

            // Retourne la liste des produits avec un code HTTP 200 (OK)
            return Ok(produits);
        }
    }
    }
