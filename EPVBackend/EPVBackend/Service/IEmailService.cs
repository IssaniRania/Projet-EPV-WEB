namespace EPVBackend.Service
{
    public interface IEmailService
    {
        
        Task SendEmailAsync(string to, string subject, string body);
        void ConfigureEmailSettings(EmailSettings emailSettings);
    }
}
