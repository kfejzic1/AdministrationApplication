﻿using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Services
{
    public class ExchangeRateService : IExchangeRateService
    {
        private AppDbContext _context;
        private IExchangeRateService _exchangeRateService;

        public ExchangeRateService(AppDbContext context, IExchangeRateService exchangeRateService)
        {
            _context = context;
            _exchangeRateService = exchangeRateService;
        }

        public async Task AddCurrency(CurrencyRequest currencyRequest)
        {
            if (currencyRequest != null)
            {
                Currency currency = new Currency
                {
                    Id = new Guid().ToString(),
                    Country = currencyRequest.Country,
                    Name = currencyRequest.Name
                };

                await _context.AddAsync(currency);
                await _context.SaveChangesAsync();
            }
        }

        public async Task AddExchangeRate(ExchangeRateRequest exchangeRateRequest)
        {
            if (exchangeRateRequest != null)
            {
                string inputCurrencyName = exchangeRateRequest.InputCurreny.Split('(', ')')[1];
                string outputCurrencyName = exchangeRateRequest.OutputCurrency.Split('(', ')')[1];

                Currency inputCurrency = await _context.Currencies.FirstOrDefaultAsync(c => c.Name == inputCurrencyName);
                Currency outputCurrency = await _context.Currencies.FirstOrDefaultAsync(c => c.Name == outputCurrencyName);

                ExchangeRate exchangeRate = new ExchangeRate
                {
                    Id = new Guid().ToString(),
                    InputCurrency = inputCurrency,
                    OutputCurrency = outputCurrency,
                    StartDate = exchangeRateRequest.StartDate,
                    EndDate = exchangeRateRequest.EndDate,
                    Rate = exchangeRateRequest.Rate
                };

                await _context.AddAsync(exchangeRate);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ICollection<ExchangeRate>> GetExchangeRates()
        {
            return await _context.ExchangeRates.ToListAsync();
        }

        public async Task<ICollection<Currency>> GetCurrencies()
        {
            return await _context.Currencies.ToListAsync();
        }
    }
}
