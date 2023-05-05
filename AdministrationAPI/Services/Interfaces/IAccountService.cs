using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IAccountService
    {
        List<AccountCreationRequest> GetUserAccountCreationRequests (string userId);
        Task<AccountCreationRequest> CreateUserAccountCreationRequest(AccountCreationRequestCreateRequest request);
        List<Account> GetRequests();
        Task<int> ApproveRequest(int id);
        Task<int> DeclineRequest(int id);
        List<Account> GetHistory();
    }
}