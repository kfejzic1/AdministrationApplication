using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IUserService
    {
        AuthenticationResult Login(LoginRequest loginRequest);
        List<User> GetAllUsers();
    }
}
