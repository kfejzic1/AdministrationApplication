
using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
        public List<AccountCreationRequest> GetUserAccountCreationRequests (string userId)
        {
            var requests = _context.AccountCreationRequests.Where(a => a.UserId == userId).ToList();
            requests.ForEach(a =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == a.CurrencyId).Name;
                a.Currency = new Currency() { Name = name };
            });

            return requests;
        }

        public List<AccountCreationRequest> GetAllRequests()
        {
            var requests = _context.AccountCreationRequests.Where(a => a.Approved == null).ToList();
            return requests;
        }

        public List<AccountCreationRequest> GetRequestHistory()
        {
            var requests = _context.AccountCreationRequests.Where(a => a.Approved != null).ToList();
            return requests;
        }

        public async Task<AccountCreationRequest> CreateUserAccountCreationRequest(AccountCreationRequestCreateRequest request)
        {
            var newAccountCreationRequest = new AccountCreationRequest
            {
                UserId = request.UserId,
                CurrencyId = request.CurrencyId,
                Description = request.Description,
                RequestDocumentPath = request.RequestDocumentPath,
                Approved = false
            };

            _context.AccountCreationRequests.Add(newAccountCreationRequest);

            await _context.SaveChangesAsync();

            newAccountCreationRequest.Currency = _context.Currencies.FirstOrDefault(c => c.Id == newAccountCreationRequest.CurrencyId);

            return newAccountCreationRequest;
        }

        public async Task<Account> ApproveRequest(int id)
        {
           
           var request = _context.AccountCreationRequests.First(a => a.Id == id);
           request.Approved = true;
           await _context.SaveChangesAsync();

            var account = new Account
            {
                UserId = request.UserId,
                CurrencyId = request.CurrencyId,
                Description = request.Description,
                RequestId = request.Id
               
            };
          
            _context.Accounts.Add(account);
            var result = await _context.SaveChangesAsync();
            account.Currency = _context.Currencies.FirstOrDefault(c => c.Id == request.CurrencyId);
            account.User = _context.Users.FirstOrDefault(u => u.Id == request.UserId);

            return account;
        }

    }
}