using MailKit.Net.Smtp;
using MimeKit;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using MailKit.Security;
using System;

namespace EPVBackend.Service
{
    public class EmailService : IEmailService
    {
        private EmailSettings _emailSettings;

        // Constructeur avec IOptions (recommandé pour la configuration)
        public EmailService(IOptions<EmailSettings> emailSettings)
        {
            _emailSettings = emailSettings.Value;
        }

        // Constructeur manuel (alternative)
        public EmailService(EmailSettings emailSettings)
        {
            _emailSettings = emailSettings;
        }

        // Implémentation de la méthode de l'interface
        public void ConfigureEmailSettings(EmailSettings emailSettings)
        {
            _emailSettings = emailSettings;
            Console.WriteLine($"Email settings configured: {_emailSettings.SenderEmail}");
        }

        // Implémentation de la méthode principale
        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            if (string.IsNullOrWhiteSpace(toEmail))
                throw new ArgumentNullException(nameof(toEmail));

            try
            {
                var message = new MimeMessage();

                // Configuration de l'expéditeur
                message.From.Add(new MailboxAddress(
                    _emailSettings.SenderName,
                    _emailSettings.SenderEmail));

                // Configuration du destinataire avec formatage optimal
                message.To.Add(new MailboxAddress("", toEmail));

                // Encodage du sujet pour les caractères spéciaux
                message.Subject = subject;

                // Ajout d'en-têtes anti-spam
                message.Headers.Add("Precedence", "bulk");
                message.Headers.Add("X-Priority", "3"); // Priorité normale
                message.Headers.Add("List-Unsubscribe", $"<mailto:unsubscribe@{_emailSettings.SenderEmail.Split('@')[1]}>");

                var builder = new BodyBuilder
                {
                    HtmlBody = body,
                    // Version texte alternative obligatoire
                    TextBody = StripHtml(body) ?? "Merci de lire cet email dans un client supportant le HTML."
                };

                message.Body = builder.ToMessageBody();

                using var client = new SmtpClient();

                // Configuration avancée de la connexion
                client.Timeout = 30000; // 30 secondes
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;

                await client.ConnectAsync(
                    _emailSettings.SmtpServer,
                    _emailSettings.SmtpPort,
                    SecureSocketOptions.StartTls);

                await client.AuthenticateAsync(
                    _emailSettings.SenderEmail,
                    _emailSettings.SenderPassword);

                await client.SendAsync(message);
                await client.DisconnectAsync(true);

                Console.WriteLine($"Email envoyé à {toEmail}");
            }
            catch (SmtpCommandException ex)
            {
                Console.WriteLine($"Erreur SMTP (Status: {ex.StatusCode}) : {ex.Message}");
                throw;
            }
            catch (AuthenticationException ex)
            {
                Console.WriteLine("Échec d'authentification. Vérifiez :");
                Console.WriteLine($"1. Mot de passe d'application valide : {!_emailSettings.SenderPassword.Contains("@")}");
                Console.WriteLine($"2. Validation 2FA activée : https://myaccount.google.com/security");
                throw;
            }
        }

        private static string StripHtml(string html)
        {
            try
            {
                var doc = new HtmlAgilityPack.HtmlDocument();
                doc.LoadHtml(html);
                return doc.DocumentNode.InnerText;
            }
            catch
            {
                return null;
            }
        }
    }