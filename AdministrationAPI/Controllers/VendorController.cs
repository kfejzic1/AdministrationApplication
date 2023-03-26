using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Services.Interfaces;
using DBContext;
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
        private readonly MyDbContext _context;

        public VendorController(IVendorService vendorService, MyDbContext context)
        {
            _vendorService = vendorService;
            _context = context;
        }

        [HttpPost]
        public IActionResult Create([FromBody] VendorCreateRequest request)
        {
            try
            {
                Console.WriteLine(request.Name);
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

        [HttpGet]
        public IActionResult GetVendors()
        {
            var vendors = _context.Vendors.ToList();
            return Ok(vendors);
        }
    }
}


