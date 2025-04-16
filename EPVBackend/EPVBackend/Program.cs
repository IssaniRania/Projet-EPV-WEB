using Microsoft.EntityFrameworkCore;
using EPVBackend.Data;
using EPVBackend;

var builder = WebApplication.CreateBuilder(args);

// Charger la chaîne de connexion depuis appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Ajouter DbContext à l'injection de dépendance
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Ajouter des services nécessaires pour Swagger
builder.Services.AddSwaggerGen(); // Active Swagger

// Ajouter les contrôleurs pour les API
builder.Services.AddControllers();

// Ajouter l'explorateur d'API pour Swagger
builder.Services.AddEndpointsApiExplorer();
//Cros
ConfigurationService.ConfigureServices(builder.Services, builder.Configuration);
var app = builder.Build();

// Appliquer les migrations et créer la base de données si elle n'existe pas
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate(); // Applique les migrations et crée la base de données si elle n'existe pas
}
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<ApplicationDbContext>();
    DbInitializer.Initialize(context);
}
// Configurer le pipeline HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(); // Génère le fichier Swagger JSON
    app.UseSwaggerUI(); // Interface Swagger UI pour visualiser et tester les API
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.UseCors("AllowAllOrigins");
// Configurer les routes des contrôleurs
app.MapControllers();

app.Run();
