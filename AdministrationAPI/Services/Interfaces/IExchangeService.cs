using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IExchangeService
    {
        public Task<TransactionResponse?> MakeTransaction(TransactionRequest transactionRequest, string token);
        public Task<CurrencyAccount?> CreateAccount(ExchangeAccountRequest Request, string token);

        public Task<List<CurrencyAccount>?> GetAllAccounts(string token);
        public Task<List<CurrencyAccount>?> GetUserAccounts(string token);
    }
}