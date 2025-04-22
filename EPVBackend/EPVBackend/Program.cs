using Microsoft.EntityFrameworkCore;
using EPVBackend.Data;
using EPVBackend;
using EPVBackend.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

var builder = WebApplication.CreateBuilder(args);

// Charger la chaîne de connexion depuis appsettings.json
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Ajouter DbContext à l'injection de dépendance
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(connectionString));
// Enregistrer EmailSettings
builder.Services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

// Enregistrer IEmailService et EmailService
builder.Services.AddSingleton<IEmailService, EmailService>();

// Configure EmailSettings from appsettings.json
//builder.services.Configure<EmailSettings>(builder.Configuration.GetSection("EmailSettings"));

// Register EmailService
builder.Services.AddTransient<IEmailService, EmailService>();
// Ajouter des services nécessaires pour Swagger
builder.Services.AddSwaggerGen(); // Active Swagger

var configuration = builder.Configuration;

// Vérifier la clé JWT
var jwtKey = configuration["Jwt:Key"] ?? throw new InvalidOperationException("La clé JWT est manquante.");
if (string.IsNullOrEmpty(jwtKey))
{
    throw new ArgumentNullException("Jwt:Key", "La clé JWT est manquante dans la configuration.");
}

// Ajouter l'authentification JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(jwtKey)
            ),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:3039")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});



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
app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowAllOrigins");
// Configurer les routes des contrôleurs
app.MapControllers();

app.Run();
