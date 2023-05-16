
using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Data;


namespace AdministrationAPI.Services
{
    public class AccountService : IAccountService
    {
        private readonly AppDbContext _context;
        public AccountService(
            AppDbContext context
        )
        {
            _context = context;

        }
        public List<AccountCreationRequest> GetUserAccountCreationRequests(string userId)
        {
            var requests = _context.AccountCreationRequests.Where(a => a.UserId == userId).ToList();
            requests.ForEach(a =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == a.CurrencyId).Name;
                a.Currency = new Currency() { Name = name };
                var user = _context.Users.FirstOrDefault(u => u.Id == a.UserId);
                if (user != null)
                {
                    a.User = user;
                }
            });

            return requests;
        }
        public List<Account> GetAllAccounts()
        {
            var accounts = _context.Accounts.ToList();
            return accounts;
        }

        public List<AccountCreationRequest> GetAllRequests()
        {
            var requests = _context.AccountCreationRequests.Where(a => a.Approved == false).ToList();
            requests.ForEach(a =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == a.CurrencyId).Name;
                a.Currency = new Currency() { Name = name };
                var user = _context.Users.FirstOrDefault(u => u.Id == a.UserId);
                if (user != null)
                {
                    a.User = user;
                }
            });
            return requests;
        }

        public List<AccountCreationRequest> GetRequestHistory()
        {
            var requests = _context.AccountCreationRequests.Where(a => a.Approved == true).ToList();
            requests.ForEach(a =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == a.CurrencyId).Name;
                a.Currency = new Currency() { Name = name };
                var user = _context.Users.FirstOrDefault(u => u.Id == a.UserId);
                if (user != null)
                {
                    a.User = user;
                }
            });
            return requests;
        }

        public async Task<AccountCreationRequest> CreateUserAccountCreationRequest(AccountCreationRequestCreateRequest request)
        {
            var accRequest = _context.AccountCreationRequests.FirstOrDefault(acr => acr.UserId == request.UserId && acr.CurrencyId == request.CurrencyId);
            if (_context.AccountCreationRequests.Count() != 0 && accRequest != null)
            {
                throw new Exception("Account request with this currency already exists.");

            }
            var newAccountCreationRequest = new AccountCreationRequest
            {
                UserId = request.UserId,
                CurrencyId = request.CurrencyId,
                Description = request.Description,
                RequestDocumentPath = request.RequestDocumentPath,
                Approved = false
            };
            Console.WriteLine("ac::: " + request.UserId + " " + request.CurrencyId);

            _context.AccountCreationRequests.Add(newAccountCreationRequest);

            await _context.SaveChangesAsync();

            newAccountCreationRequest.Currency = _context.Currencies.FirstOrDefault(c => c.Id == newAccountCreationRequest.CurrencyId);

            return newAccountCreationRequest;
        }

        public async Task<HttpResponseMessage> ApproveRequest(int id, string token)
        {

            var request = _context.AccountCreationRequests.First(a => a.Id == id);
            if (request.Approved == true) return null;
            request.Approved = true;
            await _context.SaveChangesAsync();
            /*Guid guid = Guid.NewGuid();
            string accNumber = guid.ToString();
            while (true)
            {
                if (_context.Accounts.FirstOrDefault(a => a.AccountNumber == accNumber) == null)
                    break;
                guid = Guid.NewGuid();
                accNumber = guid.ToString();
            }

            var account = new Account
            {
                UserId = request.UserId,
                CurrencyId = request.CurrencyId,
                Description = request.Description,
                RequestId = request.Id,
                AccountNumber = accNumber

            };

            _context.Accounts.Add(account);
            var result = await _context.SaveChangesAsync();
            account.Currency = _context.Currencies.FirstOrDefault(c => c.Id == request.CurrencyId);
            account.User = _context.Users.FirstOrDefault(u => u.Id == request.UserId);
            */

            string baseUrl = "https://processingserver.herokuapp.com/api/UserBankAccount/CreateAccount/";
            string userId = request.UserId; 
            string apiUrl = baseUrl + userId;

            using(HttpClient client = new HttpClient())
            {
                apiUrl += "?token=" + token;
                var currencyName = _context.Currencies.FirstOrDefault(c => c.Id == request.CurrencyId).Name;
                var requestBody = new
                {
                    currency = currencyName,
                    bankName = "Raiffeisen",
                    description = request.Description
                };

                var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

                var response = await client.PostAsync(apiUrl, content);

                return response;
            }
            return null;
            
        }

    }
}