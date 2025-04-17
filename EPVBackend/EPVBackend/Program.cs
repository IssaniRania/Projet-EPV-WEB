using Microsoft.EntityFrameworkCore;
using EPVBackend.Data;
using EPVBackend;

var builder = WebApplication.CreateBuilder(args);

// Charger la cha�ne de connexion depuis appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Ajouter DbContext � l'injection de d�pendance
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));

// Ajouter des services n�cessaires pour Swagger
builder.Services.AddSwaggerGen(); // Active Swagger

// Ajouter les contr�leurs pour les API
builder.Services.AddControllers();

// Ajouter l'explorateur d'API pour Swagger
builder.Services.AddEndpointsApiExplorer();
//Cros
ConfigurationService.ConfigureServices(builder.Services, builder.Configuration);
var app = builder.Build();

// Appliquer les migrations et cr�er la base de donn�es si elle n'existe pas
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    dbContext.Database.Migrate(); // Applique les migrations et cr�e la base de donn�es si elle n'existe pas
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
    app.UseSwagger(); // G�n�re le fichier Swagger JSON
    app.UseSwaggerUI(); // Interface Swagger UI pour visualiser et tester les API
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseAuthorization();
app.UseCors("AllowAllOrigins");
// Configurer les routes des contr�leurs
app.MapControllers();

app.Run();
