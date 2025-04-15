namespace EPVBackend.DTOs
{
    public class LoginRequest
    {
        public string Code { get; set; } = string.Empty;
        public string MotdePasse { get; set; } = string.Empty;
    }
}
