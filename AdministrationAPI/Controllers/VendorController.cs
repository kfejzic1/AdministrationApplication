using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
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
                Console.WriteLine(request.Name);
                return Ok(_vendorService.Create(request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "VendorController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetVendors()
        {
            //var vendors = _context.Vendors.ToList();

            return Ok(true);
        }
    }
}
