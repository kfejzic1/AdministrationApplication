using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IAccountService
    {
        List<AccountCreationRequest> GetUserAccountCreationRequests (string userId);
        Task<AccountCreationRequest> CreateUserAccountCreationRequest(AccountCreationRequestCreateRequest request);
        List<AccountCreationRequest> GetAllRequests();
        Task<HttpResponseMessage> ApproveRequest(int id, string token);
        List<AccountCreationRequest> GetRequestHistory();
        List<Account> GetAllAccounts();
    }
}