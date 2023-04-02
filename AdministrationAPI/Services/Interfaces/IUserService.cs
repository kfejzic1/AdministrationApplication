using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResult> Login(LoginRequest loginRequest);
        Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest);
        Task<UserDT> GetUser(string id);
        Task<QRCodeResponse> GetTwoFactorQRCode(string id);
        Task<bool> Toggle2FA(string id);
        TokenVerificationResult VerifyToken(string jwt);
    }
}
