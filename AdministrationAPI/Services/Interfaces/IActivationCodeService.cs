using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IActivationCodeService
    {
        public Task SaveCodeAsync(ActivationCode code);
        public Task<bool> ActivateEmailCodeAsync(string code, string username);
        public Task<bool> ActivateSMSCodeAsync(string code, string username);
        public Task<ActivationCode> GetCodeForUser(string id);
    }
}