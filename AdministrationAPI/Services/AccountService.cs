
using AdministrationAPI.Contracts.Requests.Users;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Identity;
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
            var accounts = _context.AccountCreationRequests.Where(a => a.UserId == userId).ToList();
            accounts.ForEach(a =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == a.CurrencyId).Name;
                a.Currency = new Currency() { Name = name };
            });

            return accounts;
        }

        public List<Account> GetRequests()
        {
            var accounts = _context.Accounts.Where(a => a.Approved == null).ToList();
            return accounts;
        }

        public List<Account> GetHistory()
        {
            var accounts = _context.Accounts.Where(a => a.Approved != null).ToList();
            return accounts;
        }

        public async Task<AccountCreationRequest> CreateUserAccountCreationRequest(AccountCreationRequestCreateRequest request)
        {
            var newAccountCreationRequest = new AccountCreationRequest
            {
                UserId = request.UserId,
                CurrencyId = request.CurrencyId,
                Description = request.Description,
                RequestDocumentPath = request.RequestDocumentPath,
                Approved = request.Approved
            };

            _context.AccountCreationRequests.Add(newAccountCreationRequest);

            await _context.SaveChangesAsync();

            newAccountCreationRequest.Currency = _context.Currencies.FirstOrDefault(c => c.Id == newAccountCreationRequest.CurrencyId);

            return newAccountCreationRequest;
        }

        public async Task<int> ApproveRequest(int id)
        {
           
           var account = _context.Accounts.First(a => a.Id == id);
           account.Approved = true;
           var result = await _context.SaveChangesAsync();

            return result;
        }

        public async Task<int> DeclineRequest(int id)
        {

            var account = _context.Accounts.First(a => a.Id == id);
            account.Approved = false;
            var result = await _context.SaveChangesAsync();

            return result;
        }
    }
}