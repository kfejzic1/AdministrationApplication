using AdministrationAPI.Contracts.Requests.Customer;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace AdministrationAPI.Services.Interfaces
{
    public interface ICustomerService
    {
        bool FindByEmail(string email);
        Task<Customer?> FindByEmailAsync(string email);
        Task<Customer?> FindByIdAsync(int id);
        Task<bool> RegisterCustomer(CustomerRegisterRequest request);
        Task<string?> getPasswordResetToken(string email);
        Task<bool> SetPassword(SetPasswordRequest setPasswordRequest);
        Task<bool> ResetPassword(SetPasswordRequest request);
        IAsyncEnumerable<Customer> GetAllCustomersAsync();
        Task<Customer?> GetCustomer(int id);
        Task<bool> EditCustomer(EditCustomerRequest request);
    }
}
