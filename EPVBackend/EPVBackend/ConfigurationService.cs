using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Cors.Infrastructure;
namespace EPVBackend
{
    public class ConfigurationService
    {
        public static void ConfigureServices(IServiceCollection services, IConfiguration configuration)
        {
            // Ajoutez les autres services nécessaires ici
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                {
                    builder.AllowAnyOrigin() // Autorise toutes les origines
                           .AllowAnyMethod()  // Autorise toutes les méthodes HTTP
                           .AllowAnyHeader(); // Autorise tous les en-têtes
                });
            });

            // Vous pouvez ajouter d'autres services comme Entity Framework, Identity, etc.
            services.AddControllers();
        }
    }
}
