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

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(_emailSettings.SenderName, _emailSettings.SenderEmail));
            message.To.Add(new MailboxAddress("", toEmail));
            message.Subject = subject;


            var builder = new BodyBuilder
            {
                HtmlBody = body,
                TextBody = "Voici le contenu de l'e-mail en texte brut (au cas où le HTML est bloqué)."
            };

            message.Body = builder.ToMessageBody();

            using var client = new SmtpClient();
            await client.ConnectAsync(_emailSettings.SmtpServer, _emailSettings.SmtpPort, SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_emailSettings.SenderEmail, _emailSettings.SenderPassword);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }

}