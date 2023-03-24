

using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IEmailService
    {
        void SendEmail(Message message);
    }
}