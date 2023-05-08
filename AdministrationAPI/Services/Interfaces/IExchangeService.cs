using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IExchangeService
    {
        public Task<(string message, TransactionResponse? obj)> MakeTransaction(TransactionRequest transactionRequest, string token);
        public Task<(string message, CurrencyAccount? obj)> CreateAccount(ExchangeAccountRequest Request, string token);

        public Task<(string message, List<CurrencyAccount>? obj)> GetAllAccounts(string token);
        public Task<(string message, List<CurrencyAccount>? obj)> GetUserAccounts(string token);
    }
}