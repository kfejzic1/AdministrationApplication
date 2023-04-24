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
        public async Task<CurrencyAccount?> CreateAccount(ExchangeAccountRequest request, string token)
        {
            try
            {
                HttpClient client = new();

                var content1 = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");
                var response = await client.PostAsync("https://processingserver.herokuapp.com/api/Account/CreateAccount?token=" + token.Substring(7),
                    content1);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var userTransfer = await response.Content.ReadFromJsonAsync<CurrencyAccount>();
                    return userTransfer;
                }
                else
                {
                    Console.WriteLine(response.Content);
                    Console.WriteLine(response.ReasonPhrase);
                    Console.WriteLine(response.ToString());
                    throw new Exception("pss" + response.StatusCode.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }
        public async Task<List<CurrencyAccount>?> GetUserAccounts(string token)
        {
            try
            {
                HttpClient client = new();

                var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Account/GetAllAccountsForUser?token=" + token.Substring(7));
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    var userTransfer = await response.Content.ReadFromJsonAsync<List<CurrencyAccount>>();
                    return userTransfer;
                }
                else
                {
                    throw new Exception("pss" + response.StatusCode.ToString());
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }

        }
        public async Task<TransactionResponse?> MakeTransaction(TransactionRequest transactionRequest,string token)
        {
            try
            {
 HttpClient client = new();

           var content1 = new StringContent(JsonConvert.SerializeObject(transactionRequest), Encoding.UTF8, "application/json");
            var response = await client.PostAsync("https://processingserver.herokuapp.com/api/Transaction/CreateTransaction?token=" + token.Substring(7),
                content1);
            if (response.StatusCode == System.Net.HttpStatusCode.OK)
            {
                var userTransfer = await response.Content.ReadFromJsonAsync<TransactionResponse>();
                return userTransfer;
            }
            else
            {
                throw new Exception("pss"+response.StatusCode.ToString());
            }
            }
            catch(Exception ex)
            {
                return null;
            }
           
        }
      

    }
}
