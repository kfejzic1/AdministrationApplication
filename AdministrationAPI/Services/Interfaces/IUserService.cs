using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResult> Login(LoginRequest loginRequest);
        Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest);
        public List<User> GetAssignedUsersForVendor(int vendorId);
        Task<UserDT> GetUser(string id);
        User GetUserByEmail(string email);
        User GetUserByFirstName(string firstName);
        Task<User> Register(RegisterRequest model);
        Task<QRCodeResponse> GetTwoFactorQRCode(string id);
        Task<bool> Toggle2FA(string id);
        List<User> GetAllUsers();
        User GetUserByName(string name);
        Task<IdentityResult> CreateUser(CreateRequest request);
        void SendConfirmationEmail(string id);
        User GetUserById(string id);
        Task<IdentityResult> SetPassword(SetPasswordRequest request);
    }
}
