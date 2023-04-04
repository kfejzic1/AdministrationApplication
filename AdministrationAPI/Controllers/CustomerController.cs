using AdministrationAPI.Contracts.Requests.Customer;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Net;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        private readonly IEmailService _emailService;

        public CustomerController(ICustomerService customerService, IEmailService emailService)
        {
            _customerService = customerService;
            _emailService = emailService;
        }

        [HttpPost("createCustomer")]
        [AllowAnonymous]
        public async Task<IActionResult> CreateUser([FromBody] CustomerRegisterRequest request)
        {
            try
            {
                request.Role = Roles.Standard;
                if (_customerService.FindByEmail(request.Email))
                {
                    var result = new ObjectResult(new { statusCode = 204, message = "User with this email already exists!" });
                    result.StatusCode = 204;
                    return result;
                }

                var succeeded = _customerService.RegisterCustomer(request);
                if (succeeded.Result)
                {
                    var customer = await _customerService.FindByEmailAsync(request.Email);
                    if (customer == null)
                    {
                        return new ObjectResult(new { statusCode = 505, message = "Error while creating customer" });
                    }

                    var confirmationLink = $"localhost:3000/customer/setCustomerPassword?token={WebUtility.UrlEncode(customer.VerificationToken)}&id={customer.Id}";
                    var message = new Message(new string[] { customer.Email! }, "Confirmation email link", confirmationLink!);

                    _emailService.SendEmail(message);

                    var resultCreation = new ObjectResult(new { statusCode = 201, message = "User created and confirmation email is sent to " + customer.Email + " succesfully" });
                    resultCreation.StatusCode = 201;
                    return resultCreation;
                }
                else return new ObjectResult(new { statusCode = 505, message = "Error while creating customer" });


            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "UserController.Login");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("setCustomerPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> SetPassword([FromBody] SetPasswordRequest setPasswordRequest)
        {
            var customer = await _customerService.FindByIdAsync(setPasswordRequest.Id);
            if (customer == null)
            {
                return NotFound("User not found.");
            }
            if (setPasswordRequest.Password == null)
            {
                return BadRequest("Password can't be null");
            }

            var response = _customerService.SetPassword(setPasswordRequest);

            if (response.Result)
            {
                return Ok("Password set succesfully");
            }
            else
            {
                return BadRequest("Invalid token");
            }
        }

        [HttpPost("forgotCustomerPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = await _customerService.FindByIdAsync(request.Id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var token = await _customerService.getPasswordResetToken(user.Email);

            var confirmationLink = $"localhost:3000/Customer/resetCustomerPassword?token={WebUtility.UrlEncode(token)}&id={user.Id}";
            var message = new Message(new string[] { user.Email! }, "Confirmation email link", confirmationLink!);

            _emailService.SendEmail(message);

            return Ok("You may now reset your password.");

        }

        [HttpPatch("resetCustomerPassword")]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] SetPasswordRequest request)
        {
            var user = await _customerService.FindByIdAsync(request.Id);
            if (user == null)
            {
                return BadRequest("User not found.");
            }
            if (user.ResetTokenExpiration < DateTime.Now)
            {
                return BadRequest("Token expired");
            }

            var status = _customerService.ResetPassword(request);

            if (status.Result)
            {
                return Ok("Password successfully changed.");
            }
            else
            {
                return BadRequest("Invalid token");
            }

        }

        [HttpGet("getAllCustomers")]
        [AllowAnonymous]
        public IAsyncEnumerable<Customer> GetAllCustomers()
        {
            return _customerService.GetAllCustomersAsync();
        }

        [HttpGet("getCustomer/{id}")]
        [AllowAnonymous]
        public async Task<Customer?> GetCustomer(int id)
        {
            return await _customerService.GetCustomer(id);
        }

        [HttpPatch("editCustomer")]
        [AllowAnonymous]
        public async Task<IActionResult> EditCustomer([FromBody] EditCustomerRequest request)
        {
            var result = await _customerService.EditCustomer(request);
            if (result)
            {
                return Ok("User successfully updated");
            }
            else
            {
                return BadRequest("Error while updating user");
            }
        }

    }
}
