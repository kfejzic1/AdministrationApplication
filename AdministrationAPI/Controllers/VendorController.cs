using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;

        public VendorController(IVendorService vendorService)
        {
            _vendorService = vendorService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] VendorCreateRequest request)
        {
            try
            {
                return Ok(_vendorService.Create(request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "CaseController.GetDynamic");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
