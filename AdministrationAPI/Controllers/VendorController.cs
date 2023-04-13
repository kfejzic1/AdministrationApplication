﻿using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Extensions;
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
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class VendorController : ControllerBase
    {
        private readonly IVendorService _vendorService;
        private readonly IDocumentService _documentService;
        private readonly IUserService _userService;

        public VendorController(IVendorService vendorService, IDocumentService documentService, IUserService userService)
        {
            _vendorService = vendorService;
            _documentService = documentService;
            _userService = userService;
        }

        [HttpPost]
        public IActionResult Create([FromBody] VendorCreateRequest request)
        {
            try
            {
                request.CreatedBy = ControlExtensions.GetId(HttpContext);
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
                LoggerUtility.Logger.LogException(ex, "VendorController.Delete");
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
                LoggerUtility.Logger.LogException(ex, "VendorController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("Location/Create")]
        public IActionResult LocationCreate([FromBody] VendorLocationCreateRequest request)
        {
            try
            {
                request.CreatedBy = ControlExtensions.GetId(HttpContext);
                return Ok(_vendorService.CreateLocation(request));
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
                return Ok(_vendorService.DeleteLocation(request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "VendorController.Delete");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("Location/{locationId}")]
        public IActionResult LocationGet([FromRoute] int locationId)
        {
            try
            {
                return Ok(_vendorService.Get(locationId));
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

        [HttpGet("Location")]
        public IActionResult LocationGetAll()
        {
            try
            {
                return Ok(_vendorService.GetAll());
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

        [HttpGet("Locations/{vendorId}")]
        public IActionResult LocationGetAllWithVendorId([FromRoute] int vendorId)
        {
            try
            {
                return Ok(_vendorService.GetAllLocationsWithVendorId(vendorId));
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

        [HttpPut("Location/Update")]
        public IActionResult LocationUpdate([FromBody] VendorLocationUpdateRequest request)
        {
            try
            {
                request.ModifiedBy = ControlExtensions.GetId(HttpContext);
                return Ok(_vendorService.UpdateLocation(request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "VendorController.Update");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("POS/Create")]
        public IActionResult POSCreate([FromBody] POSCreateRequest request)
        {
            try
            {
                request.CreatedBy = ControlExtensions.GetId(HttpContext);
                return Ok(_vendorService.CreatePOS(request));
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

        [HttpPut("POS/Update")]
        public IActionResult POSUpdate([FromBody] POSUpdateRequest request)
        {
            try
            {
                request.ModifiedBy = ControlExtensions.GetId(HttpContext);
                return Ok(_vendorService.UpdatePOS(request.Id, request));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "VendorController.Update");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("POS/Delete")]
        public IActionResult POSDelete([FromBody] POSDeleteRequest request)
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
                LoggerUtility.Logger.LogException(ex, "VendorController.Delete");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("POS/{locationId}")]
        public IActionResult GetPOSs([FromRoute] int locationId)
        {
            try
            {
                var vendors = _vendorService.GetAllPOS(locationId);
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
                LoggerUtility.Logger.LogException(ex, "VendorController.Create");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("PaymentTerm/Create")]
        public IActionResult AddPaymentTerm([FromBody] PaymentTermRequest paymentTermRequest)
        {
            try
            {
                paymentTermRequest.CreatedBy = ControlExtensions.GetId(HttpContext);
                //Create payment terms and bond documents
                _vendorService.CreatePaymentTerm(paymentTermRequest);

                return Ok();
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (FileNotFoundException ex)
            {
                return StatusCode(409, ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "VendorController.PaymentTerms");
                return StatusCode(500, ex.Message);
            }
        }

        [HttpGet("PaymentTerm")]
        public IActionResult GetAllPaymentTerms()
        {
            return Ok(_vendorService.GetAllPaymentTerms());
        }
        
        [HttpGet("PaymentTerm/{id}")]
        public IActionResult GetPaymentTerm([FromRoute] int id)
        {
            return Ok(_vendorService.GetPaymentTerm(id));
        }

        [HttpPut("PaymentTerm")]
        public IActionResult UpdatePaymentTerm([FromBody] PaymentTermRequest paymentTermRequest)
        {
            paymentTermRequest.ModifiedBy = ControlExtensions.GetId(HttpContext);

            return Ok(_vendorService.UpdatePaymentTerm(paymentTermRequest));
        }

        [HttpDelete("PaymentTerm/{id}")]
        public IActionResult DeletePaymentTerm([FromRoute] int id)
        {
            return Ok(_vendorService.DeletePaymentTerm(id));
        }
    }
}
