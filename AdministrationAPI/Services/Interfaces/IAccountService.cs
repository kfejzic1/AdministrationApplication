using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IAccountService
    {
        List<Account> GetUserAccounts(string userId);
        Task CreateUserAccount(UserAccountCreateRequest request);
    }
}