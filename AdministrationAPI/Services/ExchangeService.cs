using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Text;
using Twilio.Jwt.AccessToken;

namespace AdministrationAPI.Services
{
    public class ExchangeService : IExchangeService
    {
        private readonly AppDbContext _context;

        public ExchangeService(AppDbContext context)
        {
            _context = context;
        }
        public async Task<(string message,CurrencyAccount?obj)> CreateAccount(ExchangeAccountRequest request, string token)
        {
            try
            {
                HttpClient client = new();

                if (token.Length < 8)
                    return ("Invalid token!", null);
                var content1 = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
                var response = await client.PostAsync("https://processingserver.herokuapp.com/api/Account/CreateAccount?token=" + token.Substring(7),
                    content1);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var userTransfer = await response.Content.ReadFromJsonAsync<CurrencyAccount>();
                    return ("",userTransfer);
                }
                else
                {
                    var g = await response.Content.ReadAsStringAsync();
                    return (g.Substring(12, g.Length - 14), null);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return (ex.Message,null);
            }

        }
        public async Task<(string message,List<CurrencyAccount>? obj)> GetUserAccounts(string token)
        {
            try
            {
                HttpClient client = new();

                if (token.Length < 8)
                    return ("Invalid token!", null);
                var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Account/GetAllAccountsForUser?token=" + token.Substring(7));
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var userTransfer = await response.Content.ReadFromJsonAsync<List<CurrencyAccount>>();
                    return ("",userTransfer);
                }
                else
                {
                    var g = await response.Content.ReadAsStringAsync();
                    return (g.Substring(12, g.Length - 14), null);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return (ex.Message,null);
            }

        }
        public async Task<(string message, List<CurrencyAccount>? obj)> GetAllAccounts(string token)
        {
            try
            {
                HttpClient client = new();

                if (token.Length < 8)
                    return ("Invalid token!", null);
                var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Account/GetAllAccounts?token=" + token.Substring(7));
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var userTransfer = await response.Content.ReadFromJsonAsync<List<CurrencyAccount>>();
                    return ("", userTransfer);
                }
                else
                {
                    var g = await response.Content.ReadAsStringAsync();
                    return (g.Substring(12, g.Length - 14), null);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return (ex.Message, null);
            }

        }
        public async Task<(string message,TransactionResponse? obj)> MakeTransaction(TransactionRequest transactionRequest, string token)
        {
            try
            {
                HttpClient client = new();
                if (token.Length < 8)
                    return ("Invalid token!", null);
                var content1 = new StringContent(JsonConvert.SerializeObject(transactionRequest), Encoding.UTF8, "application/json");
                var response = await client.PostAsync("https://processingserver.herokuapp.com/api/Transaction/CreateTransaction?token=" + token.Substring(7),
                    content1);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var userTransfer = await response.Content.ReadFromJsonAsync<TransactionResponse>();
                    return ("", userTransfer);
                }
                else
                {
                    var g=await response.Content.ReadAsStringAsync();
                    return (g.Substring(12, g.Length - 14),null);
                }
            }
            catch (Exception ex)
            {
                return (ex.Message, null);
            }

        }


    }
}