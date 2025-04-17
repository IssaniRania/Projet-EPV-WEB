using EPVBackend.Data;
using Microsoft.AspNetCore.Mvc;
using EPVBackend.Model.Initialisation;
using EPVBackend.DTOs;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
namespace EPVBackend.Controllers.Initialisation
{
    [Route("api/ModeReglement")]
    [ApiController]
    public class ModeReglementController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ModeReglementController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            // Récupère tous les produits depuis la base de données
            var produits = await _context.ModeReglement.ToListAsync();

            // Retourne la liste des produits avec un code HTTP 200 (OK)
            return Ok(produits);
        }
        // GET: api/ModeReglement/{code}
        [HttpGet("{code}")]
        public async Task<IActionResult> GetByCode(string code)
        {
            var mode = await _context.ModeReglement.FindAsync(code);
            if (mode == null)
                return NotFound();

            return Ok(mode);
        }
        // POST: api/ModeReglement
        [HttpPost]
        public async Task<IActionResult> CreateReglement([FromBody] ModeReglement modeRegl)
        {
            if (modeRegl == null)
            {
                return BadRequest("Le produit ne peut pas être nul.");
            }

            _context.ModeReglement.Add(modeRegl);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAll), new { Code = modeRegl.Code }, modeRegl);
        }
        // PUT: api/ModeReglement/{code}
        [HttpPut("{code}")]
        public async Task<IActionResult> UpdateReglement(string code, [FromBody] ModeReglement modeRegl)
        {
            if (code != modeRegl.Code)
                return BadRequest("Code non cohérent.");

            var existing = await _context.ModeReglement.FindAsync(code);
            if (existing == null)
                return NotFound();

            existing.Libelle = modeRegl.Libelle;
            existing.MoyenPaiement = modeRegl.MoyenPaiement;
            existing.Tiroir = modeRegl.Tiroir;

            await _context.SaveChangesAsync();
            return NoContent();
        }
        // DELETE: api/ModeReglement/{code}
        [HttpDelete("{code}")]
        public async Task<IActionResult> DeleteReglement(string code)
        {
            var mode = await _context.ModeReglement.FindAsync(code);
            if (mode == null)
                return NotFound();

            _context.ModeReglement.Remove(mode);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
