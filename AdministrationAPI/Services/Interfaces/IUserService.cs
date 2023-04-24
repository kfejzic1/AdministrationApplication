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
        Task<User> GetUserFromLoginRequest(MobileLoginRequest loginRequest);
        Task<AuthenticationResult> FacebookSocialLogin(string token);
        Task<AuthenticationResult> GoogleSocialLogin(string token);
        Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest);
        public List<User> GetAssignedUsersForVendor(int vendorId);
        Task<UserDT> GetUser(string id);
        User GetUserByEmail(string email);
        User GetUserByFirstName(string firstName);
        Task<User> Register(RegisterRequest model);
        Task<QRCodeResponse> GetTwoFactorQRCode(string id);
        Task<bool> Toggle2FA(string id);
        List<User> GetAllUsers();
        List<User> GetAllUsersByAdmin();
        User GetUserByName(string name);
        Task<bool> DeleteUserAsync(string username);
        Task<IdentityResult> CreateUser(CreateRequest request);
        void SendConfirmationEmail(string id);
        User GetUserById(string id);
        Task<IdentityResult> SetPassword(SetPasswordRequest request);
        Task<IdentityResult> EditUser(EditRequest request);
        Task<IdentityResult> EditUserAdmin(EditRequest request);
        void SendPasswordResetEmail(string email);
        Task<IdentityResult> ResetPasswordAsync(SetPasswordRequest request);
        Task<GetUserResponse> GetUserWithRolesById(string id);
        IEnumerable<IdentityRole> GetRoles();
        Task<AuthenticationResult> GetTokenForUser(User user);
        Task<User> GetUserByEmailPhone(string email, string phone);

        Task InvalidateToken(string jwt);
        bool IsTokenValid(string jwt);

        Task<IEnumerable<User>> GetUsersForVendor(int adminId);

        Task<IdentityResult> EditVendorUser(EditRequest request, int adminId);

        Task<Boolean> IsLoggedInUserAdmin();


    }
}
