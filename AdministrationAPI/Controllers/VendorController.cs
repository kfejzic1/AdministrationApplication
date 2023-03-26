using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using DBContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

            // Call EnsureCreated() method to create tables in the database if they don't exist
            _context.Database.EnsureCreated();
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

        [HttpPost("migrate")]
        public IActionResult Migrate()
        {
            try
            {
                _context.Database.Migrate();
                return Ok("Migration successful.");
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "VendorController.Migrate");
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
