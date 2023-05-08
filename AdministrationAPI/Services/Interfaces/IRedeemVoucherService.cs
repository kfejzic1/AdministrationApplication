using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IRedeemVoucherService
    {
        public Task<(string message, bool obj)> MakeTransaction(RedeemVoucherResponse transactionRequest, string token);

    }
}