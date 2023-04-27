using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Utilities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

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


        [HttpPost("create-voucher")]
        public async Task<IActionResult> CreateVoucher([FromBody] VoucherRequest voucherRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                var tokenRole = token.Roles;
                if (token.Roles.Contains("Admin"))
                {
                    for (int i = 0; i < voucherRequest.NoVouchers; i++)
                        _voucherService.CreateVoucher(voucherRequest);

                    return Ok(voucherRequest);
                }
                    return StatusCode(500, "Admin is not logged in!");
              
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }

        }


        [HttpPost("activate-voucher")]
        public async Task<IActionResult> ActivateVoucher([FromBody] ChangeVoucherStatusRequest changeVoucherStatusRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));

                if (!token.Roles.Contains("Admin"))
                    return StatusCode(500, "Admin is not logged in!");

                User user = _userService.GetUserByName(changeVoucherStatusRequest.Username);
                if (user == null)
                    throw new Exception("This username doesn't exists!");

                user.UserName = changeVoucherStatusRequest.Username;
                Voucher voucherFromDatabase = _voucherService.GetVoucherByCode(changeVoucherStatusRequest.Code);
                if (voucherFromDatabase == null)
                    throw new Exception("Voucher with this code is not in database!");
                else if (voucherFromDatabase.User != null)
                    throw new Exception("This voucher is already attached to user!");

                voucherFromDatabase = _voucherService.GetVoucherByUserId(user.Id);
                if (voucherFromDatabase != null)
                    throw new Exception("This username already has a voucher!");

                var voucher = _voucherService.UpdateVoucher(user, changeVoucherStatusRequest.Code);
                return Ok(voucher);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("redeem-voucher")]
        public async Task<IActionResult> RedeemVoucher([FromBody] ChangeVoucherStatusRequest changeVoucherStatusRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));

                if (!token.Roles.Contains("Admin"))
                    return StatusCode(500, "Admin is not logged in!");

                User user = _userService.GetUserByName(changeVoucherStatusRequest.Username);
                if (user == null)
                    throw new Exception("User with this username doesn't exists!");

                Voucher voucher = _voucherService.GetVoucherByCode(changeVoucherStatusRequest.Code);
                if (voucher == null)
                    throw new Exception("Voucher with this code doesn't exists!");

                user.UserName = changeVoucherStatusRequest.Username;
                 voucher = _voucherService.GetVoucherByUserId(user.Id);
                if(voucher == null)
                    throw new Exception("This voucher is not attached to any user!");
                if (voucher.Code != changeVoucherStatusRequest.Code)
                    throw new Exception("This user is not attached with this voucher code!");
                Voucher v = _voucherService.RedeemVoucher(user, changeVoucherStatusRequest.Code);
                return Ok(v);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }


        [HttpPost("void-voucher")]
        public async Task<IActionResult> VoidVoucher([FromBody] ChangeVoucherStatusRequest changeVoucherStatusRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));

                if (!token.Roles.Contains("Admin"))
                    return StatusCode(500, "Admin is not logged in!");

                Voucher v = _voucherService.VoidVoucher(changeVoucherStatusRequest.Code);
                return Ok(v);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
