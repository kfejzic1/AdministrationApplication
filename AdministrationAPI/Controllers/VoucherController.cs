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
           
                List<VoucherDataResponse> vouchers = new List<VoucherDataResponse>();

                for (int i = 0; i < voucherRequest.NoVouchers; i++)
                {
                    var user =  _userService.GetUserByName(token.Username);
                    Voucher v = await _voucherService.CreateVoucher(voucherRequest, user.Id);
                    vouchers.Add(new VoucherDataResponse() { Id = v.Id, Amount = v.Amount, Code = v.Code, CreatedBy = v.CreatedBy, CurrencyId = v.CurrencyId, RedeemedBy = v.RedeemedBy, VoucherStatusId = v.VoucherStatusId });
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
        [HttpPost("change-voucher-status")]
        public async Task<IActionResult> ChangeVoucherStatus([FromBody] ChangeVoucherStatusRequest changeVoucherStatusRequest)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));

                Voucher voucher = _voucherService.GetVoucherByCode(changeVoucherStatusRequest.Code);
                if (voucher == null)
                    throw new Exception("Voucher with this code doesn't exist!");

                if (changeVoucherStatusRequest.StatusId == "2")  //activate voucher
                    voucher = _voucherService.ActivateVoucher(changeVoucherStatusRequest.Code);
                
                else if (changeVoucherStatusRequest.StatusId == "3") //redeem token
                {
                    User user = _userService.GetUserByName(token.Username);
                    if (user == null)
                        throw new Exception("User with this username doesn't exist!");
                    voucher = await _voucherService.RedeemVoucher(user, changeVoucherStatusRequest.Code);
                }

                else if (changeVoucherStatusRequest.StatusId == "4")  //void token
                    voucher = await _voucherService.VoidVoucher(changeVoucherStatusRequest.Code);
        
                 else
                        throw new Exception("Invalid voucher status provided!");

                var response = new VoucherDataResponse() { Id = voucher.Id, Amount = voucher.Amount, Code = voucher.Code, CreatedBy = voucher.CreatedBy, CurrencyId = voucher.CurrencyId, RedeemedBy = voucher.RedeemedBy, VoucherStatusId = voucher.VoucherStatusId };
                return Ok(response);
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
        public async  Task<IActionResult> GetVouchers()
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            TokenVerificationResult token = TokenUtilities.VerifyToken(ControlExtensions.GetToken(HttpContext));

            List<VoucherDataResponse> vouchers = await _voucherService.GetVouchers(token.Username);
            return Ok(vouchers);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("get-voucher")]
        public async Task<IActionResult> GetVoucher([FromQuery] int voucherId)
        {
            Voucher voucher = await _voucherService.GetVoucherById(voucherId);

            if (voucher == null)
            {
                return NotFound(new { message = "Voucher with specified id not found!" });
            }

            return Ok(voucher);
        }

    }
}
