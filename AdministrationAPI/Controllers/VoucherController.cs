using AdministrationAPI.Contracts.Requests.Vouchers;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models;
using AdministrationAPI.Models.Voucher;
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


        [Authorize(Roles = "Admin")]
        [HttpPost("create-voucher")]
        public async Task<IActionResult> CreateVoucher([FromBody] VoucherRequest voucherRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
           
                List<Voucher> vouchers = new List<Voucher>();

                for (int i = 0; i < voucherRequest.NoVouchers; i++)
                {
                    var user =  _userService.GetUserByName(token.Username);
                   Voucher v = await _voucherService.CreateVoucher(voucherRequest, user.Id);
                    vouchers.Add(v);
                }

                    return Ok(vouchers);
              
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

        [Authorize(Roles = "Admin")]
        [HttpPost("activate-voucher")]
        public async Task<IActionResult> ActivateVoucher([FromBody] ChangeVoucherStatusRequest changeVoucherStatusRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));

                Voucher voucherFromDatabase = _voucherService.GetVoucherByCode(changeVoucherStatusRequest.Code);
                if (voucherFromDatabase == null)
                    throw new Exception("Voucher with this code is not in database!");
                else if (voucherFromDatabase.User != null)
                    throw new Exception("This voucher is already attached to user!");

                var voucher = _voucherService.ActivateVoucher(changeVoucherStatusRequest.Code);
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

        [Authorize(Roles = "Admin")]
        [HttpPost("redeem-voucher")]
        public async Task<IActionResult> RedeemVoucher([FromBody] ChangeVoucherStatusRequest changeVoucherStatusRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));

                User user = _userService.GetUserByName(changeVoucherStatusRequest.Username);
                if (user == null)
                    throw new Exception("User with this username doesn't exists!");

                Voucher voucher = _voucherService.GetVoucherByCode(changeVoucherStatusRequest.Code);
                if (voucher == null)
                    throw new Exception("Voucher with this code doesn't exists!");

                user.UserName = changeVoucherStatusRequest.Username;
                if (voucher.Code != changeVoucherStatusRequest.Code)
                    throw new Exception("This user is not attached with this voucher code!");
                Voucher v = await _voucherService.RedeemVoucher(user, changeVoucherStatusRequest.Code);
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

        [Authorize(Roles = "Admin")]
        [HttpPost("void-voucher")]
        public async Task<IActionResult> VoidVoucher([FromBody] ChangeVoucherStatusRequest changeVoucherStatusRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));
                Voucher voucher = _voucherService.GetVoucherByCode(changeVoucherStatusRequest.Code);
                if (voucher == null)
                    throw new Exception("Voucher with this code doesn't exists!");

                Voucher v = await _voucherService.VoidVoucher(changeVoucherStatusRequest.Code);
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

        [Authorize(Roles = "Admin")]
        [HttpGet("get-vouchers")]
        public async  Task<IActionResult> GetVouchers([FromQuery] string adminId)
        {
            List<Voucher> vouchers = await _voucherService.GetVouchers(adminId);
            return Ok(vouchers);
        }

    }
}
