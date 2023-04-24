using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IAccountService
    {
        List<Account> GetAccountsForUser(string userId);
        List<Account> GetAccountsForUserName(string userName);
        string getIdFromUsername(string userName);
    }
}