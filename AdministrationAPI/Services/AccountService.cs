
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
        public List<Account> GetUserAccounts(string userId)
        {
            var accounts = _context.Accounts.Where(a => a.UserId == userId).ToList();
            accounts.ForEach(a =>
            {
                string name = _context.Currencies.FirstOrDefault(c => c.Id == a.CurrencyId).Name;
                a.Currency = new Currency() { Name = name };
            });

            return accounts;
        }

        public async Task<Account> CreateUserAccount(UserAccountCreateRequest request)
        {
            var newAccount = new Account
            {
                UserId = request.UserId,
                AccountNumber = request.AccountNumber,
                CurrencyId = request.CurrencyId,
                Description = request.Description,
                RequestDocumentPath = request.RequestDocumentPath,
                Approved = request.Approved
            };

            _context.Accounts.Add(newAccount);

            await _context.SaveChangesAsync();

            newAccount.Currency = _context.Currencies.FirstOrDefault(c => c.Id == newAccount.CurrencyId);

            return newAccount;
        }
    }
}