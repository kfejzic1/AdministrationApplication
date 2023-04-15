using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace AdministrationAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VendorController : ControllerBase
    {
        private readonly IVendorLocationService _vendorLocationService;
        private readonly IVendorService _vendorService;
        private readonly IUserService _userService;
        private readonly IVendorPOSService _vendorPOSService;

        public VendorController(IVendorService vendorService, IUserService userService, IVendorLocationService vendorLocationService, IVendorPOSService vendorPOSService)
        {
            _vendorService = vendorService;
            _userService = userService;
            _vendorLocationService = vendorLocationService;
            _vendorPOSService = vendorPOSService;
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
                LoggerUtility.Logger.LogException(ex, "VendorController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("Delete")]
        public IActionResult VendorDelete([FromBody] VendorDeleteRequest request)
        {
            try
            {
                return Ok(_vendorService.Delete(request.Id));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Delete");
                return StatusCode(500, ex.Message);
            }
        }


        [HttpGet]
        public IActionResult GetVendors()
        {
            try
            {
                var vendors = _vendorService.GetAll();
                vendors.ForEach(vendor =>
                {
                    vendor.AssignedUsers = _userService.GetAssignedUsersForVendor(vendor.Id);
                });

                return Ok(vendors);
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

        [HttpGet("{id}")]
        public IActionResult GetVendor([FromRoute] int id)
        {
            try
            {
                return Ok(_vendorService.Get(id));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Location/Create")]
        public IActionResult LocationCreate([FromBody] VendorLocationCreateRequest request)
        {
            try
            {
                return Ok(_vendorLocationService.Create(request));
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

        [HttpDelete("Location/Delete")]
        public IActionResult LocationDelete([FromBody] VendorLocationDeleteRequest request)
        {
            try
            {
                return Ok(_vendorLocationService.Delete(request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Delete");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Location/{locationId}")]
        public IActionResult LocationGet([FromRoute] int locationId)
        {
            try
            {
                return Ok(_vendorLocationService.Get(locationId));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Location")]
        public IActionResult LocationGetAll()
        {
            try
            {
                return Ok(_vendorLocationService.GetAll());
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Locations/{vendorId}")]
        public IActionResult LocationGetAllWithVendorId([FromRoute] int vendorId)
        {
            try
            {
                return Ok(_vendorLocationService.GetAllWithVendorId(vendorId));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("Location/Update")]
        public IActionResult LocationUpdate([FromBody] VendorLocationUpdateRequest request)
        {
            try
            {
                return Ok(_vendorLocationService.Update(request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Update");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("POS/Create")]
        public IActionResult POSCreate([FromBody] POSCreateRequest request)
        {
            try
            {
                return Ok(_vendorPOSService.Create(request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Create");
                return StatusCode(500, ex.Message);
            }
        }
        [HttpPut("POS/Update")]
        public IActionResult POSUpdate([FromBody] POSUpdateRequest request)
        {
            try
            {
                return Ok(_vendorPOSService.Update(request.Id, request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Update");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("POS/Delete")]
        public IActionResult POSDelete([FromBody] POSDeleteRequest request)
        {
            try
            {
                return Ok(_vendorPOSService.Delete(request.Id));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Delete");
                return StatusCode(500, ex.Message);
            }
        }
        [HttpGet("POS/{locationId}")]
        public IActionResult GetPOSs([FromRoute] int locationId)
        {

            try
            {
                var vendors = _vendorPOSService.GetAll(locationId);
                vendors.ForEach(vendor =>
                {
                    vendor.LocationId = locationId;
                });

                return Ok(vendors);
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "POSController.Create");
                return StatusCode(500, ex.Message);
            }
        }

    }
}
