using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace AdministrationAPI.Services
{
    public class ExchangeRateService : IExchangeRateService
    {
        private readonly AppDbContext _context;

        public ExchangeRateService(AppDbContext context)
        {
            _context = context;
        }

        public async Task AddCurrency(CurrencyRequest currencyRequest)
        {
            if (currencyRequest != null)
            {
                Currency existingCurrency = await _context.Currencies.FirstOrDefaultAsync(c => c.Country == currencyRequest.Country && c.Name == currencyRequest.Name);

                if (existingCurrency != null)
                {
                    return;
                }

                Currency currency = new Currency
                {
                    Id = Guid.NewGuid().ToString(),
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

                ExchangeRate existingExchangeRate = await _context
                    .ExchangeRates
                    .Include(er => er.InputCurrency)
                    .Include(er => er.OutputCurrency)
                    .FirstOrDefaultAsync(er => er.InputCurrency.Equals(inputCurrency) && er.OutputCurrency.Equals(outputCurrency));

                if (existingExchangeRate != null)
                {
                    return;
                }

                ExchangeRate exchangeRate = new ExchangeRate
                {
                    Id = Guid.NewGuid().ToString(),
                    InputCurrency = inputCurrency,
                    OutputCurrency = outputCurrency,
                    StartDate = exchangeRateRequest.StartDate,
                    EndDate = exchangeRateRequest.EndDate,
                    Rate = exchangeRateRequest.Rate
                };

                ExchangeRate exchangeRateReciprocal = new ExchangeRate
                {
                    Id = Guid.NewGuid().ToString(),
                    InputCurrency = outputCurrency,
                    OutputCurrency = inputCurrency,
                    StartDate = exchangeRateRequest.StartDate,
                    EndDate = exchangeRateRequest.EndDate,
                    Rate = 1 / exchangeRate.Rate
                };

                await _context.AddAsync(exchangeRate);
                await _context.AddAsync(exchangeRateReciprocal);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ICollection<ExchangeRate>> GetExchangeRates()
        {
            return await _context.ExchangeRates.Include(er => er.InputCurrency).Include(er => er.OutputCurrency).ToListAsync();
        }

        public async Task<ICollection<Currency>> GetCurrencies()
        {
            return await _context.Currencies.ToListAsync();
        }

        public async Task DeleteAllExchangeRates()
        {
            await _context.ExchangeRates.ExecuteDeleteAsync();
        }
    }
}
