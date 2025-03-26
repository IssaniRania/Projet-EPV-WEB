using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EPVBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using EPVBackend.Data;
namespace EPVBackend.Controllers
{
    [Route("api/produit")]
    [ApiController]
    public class ControllerProduit : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ControllerProduit(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/produit
        [HttpGet]
        public async Task<IActionResult> GetAllProduits()
        {
            // Récupère tous les produits depuis la base de données
            var produits = await _context.Produits.ToListAsync();

            // Retourne la liste des produits avec un code HTTP 200 (OK)
            return Ok(produits);
        }
        

        // GET: api/produit/123456
        [HttpGet("{codeBarres}")]
        public async Task<ActionResult<Produit>> GetProduit(string codeBarres)
        {
            var produit = await _context.Produits.FindAsync(codeBarres);

            if (produit == null)
            {
                return NotFound();
            }

            return Ok(produit);
        }
    }

}
