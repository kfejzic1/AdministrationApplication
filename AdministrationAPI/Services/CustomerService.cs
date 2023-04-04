using AdministrationAPI.Contracts.Requests.Customer;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace AdministrationAPI.Services
{
    public class CustomerService : ICustomerService
    {
        private CustomerDbContext _context;
        public CustomerService() {
            _context = new CustomerDbContext();
        }

        
        public async Task<Customer?> FindByIdAsync(int id)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id == id );
            return customer;

        }

        public async Task<Customer?> FindByEmailAsync(string email)
        {
            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Email == email);
            return customer;
        }

        public bool FindByEmail(string email)
        {
            using (var context = new CustomerDbContext())
            {
                return context.Customers.Any(customer => customer.Email == email);
            }
        }


        public async Task<bool> RegisterCustomer(CustomerRegisterRequest request)
        {
            
            var customer = new Customer
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Role = request.Role,
                VerificationToken = CreateRandomToken()

            };

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return true;
            
        }

        public async Task<bool> SetPassword(SetPasswordRequest setPasswordRequest)
        {

            var customer = await _context.Customers.FirstOrDefaultAsync(c => c.Id==setPasswordRequest.Id && c.VerificationToken==setPasswordRequest.Token);
            if (customer == null || customer.VerifiedAt != null)
            {
                return false;
            }
            CreatePasswordHash(setPasswordRequest.Password, out byte[] passwordHash, out byte[] passwordSalt);
            customer.VerifiedAt = DateTime.UtcNow;
            customer.PasswordHash = passwordHash;
            customer.PasswordSalt = passwordSalt;
            await _context.SaveChangesAsync();

            return true;
            
        }

        public async Task<string?> getPasswordResetToken(string email)
        {
            var user = await FindByEmailAsync(email);
            if (user == null)
            {
                return null;
            }
            user.PasswordResetToken = CreateRandomToken();
            user.ResetTokenExpiration = DateTime.Now.AddDays(1);
            await _context.SaveChangesAsync();

            return user.PasswordResetToken;

        }

        public async Task<bool> ResetPassword(SetPasswordRequest request)
        {
            var customer = FindByIdAsync(request.Id);
            if (customer == null || customer.Result.PasswordResetToken != request.Token)
            {
                return false;
            }
            CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);

            customer.Result.PasswordHash = passwordHash;
            customer.Result.PasswordSalt = passwordSalt;
            customer.Result.PasswordResetToken = null;
            customer.Result.ResetTokenExpiration = null;

            await _context.SaveChangesAsync();
            return true;
        }

        public IAsyncEnumerable<Customer> GetAllCustomersAsync()
        {
            return _context.Customers.AsAsyncEnumerable();
        }

        public async Task<Customer?> GetCustomer(int id)
        {
            return await _context.Customers.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<bool> EditCustomer(EditCustomerRequest request)
        {

            var user = await _context.Customers.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (user == null)
            {
                return false;
            }
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.PhoneNumber = request.PhoneNumber;
            user.Role = request.Role;

            await _context.SaveChangesAsync();

            return true;
        }

        #region Additional functions
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        //Used later for checking passwords
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac
                    .ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private string CreateRandomToken()
        {
            return Convert.ToHexString(RandomNumberGenerator.GetBytes(64));
        }
        #endregion

        
    }
}
