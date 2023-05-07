using AdministrationAPI.Contracts.Requests.Exchange;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Contracts.Responses;
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
    public class RedeemVoucherService : IRedeemVoucherService
    {

        public RedeemVoucherService()
        {
        }
       
   
        public async Task<(string message, bool obj)> MakeTransaction(RedeemVoucherResponse transactionRequest, string token)
        {
            try
            {
                HttpClient client = new();
                if (token.Length < 8)
                    return ("Invalid token!", false);
                var content1 = new StringContent(JsonConvert.SerializeObject(transactionRequest), Encoding.UTF8, "application/json");
                var response = await client.PostAsync("https://processingserver.herokuapp.com/api/Voucher/ExecuteVoucherRedemption?token=" + token.Substring(7),
                    content1);
                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    Console.WriteLine(response.Content);
                    var d = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(d);

                    return ("", true);
                }
                else
                {
                    var g = await response.Content.ReadAsStringAsync();
                    return (g.Substring(12, g.Length - 14), false);
                }
            }
            catch (Exception ex)
            {
                return (ex.Message, false);
            }

        }

       
    }
}