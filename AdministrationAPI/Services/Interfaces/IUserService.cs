using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IUserService
    {
        AuthenticationResult Login(LoginRequest loginRequest);
    }
}
