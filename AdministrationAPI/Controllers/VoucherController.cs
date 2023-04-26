using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.DTOs;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdministrationAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VoucherController : Controller
    {
        private readonly IVoucherService _voucherService;
        private readonly IUserService _userService;
        private readonly TokenUtilities _tokenUtilities;

        public VoucherController(IVoucherService voucherService, IUserService userService, TokenUtilities tokenUtilities) 
        {
            _voucherService = voucherService;
            _userService = userService;
            _tokenUtilities = tokenUtilities;
        }

        //is admin ? create voucher : throw exception 

        [HttpPost("create-voucher")]
        public async Task<IActionResult> CreateVoucher([FromBody] VoucherRequest voucherRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                if (token.Roles.Contains("Admin"))
                {
                  
                    for(int i = 0; i < voucherRequest.NoVouchers; i++)
                        _voucherService.CreateVoucher(voucherRequest);

                }

               else throw new Exception("Admin is not logged in!");
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return StatusCode(200, "Admin is logged in!");
        }


        [HttpPost("activate-voucher")]
        public async Task<IActionResult> ActivateVoucher([FromBody] string username, string code)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                if (token.Roles.Contains("Admin"))
                {
                    User user = _userService.GetUserByName(username);
                    
                    user.UserName = username;
                    _voucherService.UpdateVoucher(user, code);
                   
                }

                else throw new Exception("Admin is not logged in!");
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return StatusCode(200, "Admin is logged in!");
        }


        [HttpPost("redeem-voucher")]
        public async Task<IActionResult> RedeemVoucher([FromBody] string username, string code)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                if (token.Roles.Contains("Admin"))
                {
                    User user = _userService.GetUserByName(username);

                    user.UserName = username;
                    _voucherService.RedeemVoucher(user, code);

                }

                else throw new Exception("Admin is not logged in!");
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return StatusCode(200, "Admin is logged in!");
        }


        [HttpPost("void-voucher")]
        public async Task<IActionResult> VoidVoucher([FromBody] string code)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                if (token.Roles.Contains("Admin"))
                {
                    _voucherService.VoidVoucher(code);

                }

                else throw new Exception("Admin is not logged in!");
            }
            catch (Exception e)
            {
                return NotFound("Error: " + e.Message);
            }

            return StatusCode(200, "Admin is logged in!");
        }


    }
}
