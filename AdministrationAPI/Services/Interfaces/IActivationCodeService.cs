using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IActivationCodeService
    {
        public Task<bool> GenerateEmailActivationCodeForUserAsync(User user);
        public Task<bool> GenerateSMSActivationCodeForUserAsync(User user);
        public Task<bool> ActivateEmailCodeAsync(string code, string username);
        public Task<bool> ActivateSMSCodeAsync(string code, string username);
    }
}