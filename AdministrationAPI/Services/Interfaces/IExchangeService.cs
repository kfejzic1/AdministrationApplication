using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IExchangeService
    {
        public Task<TransactionResponse?> MakeTransaction(TransactionRequest transactionRequest, string token);
        public Task<TransactionResponse?> MakeTransactionWithPhoneNumber(TransactionPhoneDto transactionRequest, string token);
    }
}