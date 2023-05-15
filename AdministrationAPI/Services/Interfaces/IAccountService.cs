using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IAccountService
    {
        List<AccountCreationRequest> GetUserAccountCreationRequests (string userId);
        Task<AccountCreationRequest> CreateUserAccountCreationRequest(AccountCreationRequestCreateRequest request);
        List<AccountCreationRequest> GetAllRequests();
        Task<Account?> ApproveRequest(int id);
        List<AccountCreationRequest> GetRequestHistory();
        List<Account> GetAllAccounts();
    }
}