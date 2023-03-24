

//namespace User.Management.Service.Models kod njega je ovo razdvojeno bilo 
//pa treba provjeriti kako cemo mi rasporediti u fajlove
namespace AdministrationAPI.Models
{
    public class EmailConfiguration
    {
        public string From { get; set; } = null!;
        public string SmtpServer { get; set; } = null!;
        public int Port { get; set; }
        public string UserName { get; set; } = null!;
        public string Password { get; set; } = null!;
    }
}