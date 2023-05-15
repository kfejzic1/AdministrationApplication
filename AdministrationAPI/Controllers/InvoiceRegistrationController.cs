using AdministrationAPI.Contracts.Requests.EInvoiceRegistration;
using AdministrationAPI.Contracts.Responses.EInvoiceRegistration;
using AdministrationAPI.Extensions;
using AdministrationAPI.Services.Interfaces;
using LoggerUtility;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Drawing.Text;

namespace AdministrationAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class InvoiceRegistrationController : ControllerBase
{
    private readonly IVendorService _vendorService;
    private readonly IUserService _userService;
    private readonly IAdminEInvoiceService _adminEInvoiceService;

    public InvoiceRegistrationController(IVendorService vendorService, IUserService userService, IAdminEInvoiceService adminEInvoiceService)
    {
        _vendorService = vendorService;
        _userService = userService;
        _adminEInvoiceService = adminEInvoiceService;
    }

    [HttpGet("required-data")]
    public IActionResult ReturnRequiredDataForB2B([FromQuery] string B2BName)
    {
        if (B2BName == null)
        {
            return StatusCode(StatusCodes.Status422UnprocessableEntity,
                new { message = "B2B name cannot be empty" });
        }

        var vendor = _vendorService.GetByName(B2BName);

        if (vendor == null)
        {
            return NotFound(new { message = "B2B vendor not found" });
        }

        return Ok(new EInvoiceDataRequired
        {
            Field1 = vendor.Param1,
            Field2 = vendor.Param2,
            Field3 = vendor.Param3,
            Field4 = vendor.Param4,
        });
    }

    [HttpPost("registration-request")]
    public async Task<IActionResult> CreateEInvoiceRegistrationRequest([FromBody] EInvoiceRegistrationData eInvoiceRegistrationData)
    {
        if (eInvoiceRegistrationData == null)
        {
            return StatusCode(StatusCodes.Status422UnprocessableEntity,
                new { message = "Invoice registration data cannot be empty" });
        }

        var userId = ControlExtensions.GetId(HttpContext);

        try
        {
            var eInvoiceRequest = await _adminEInvoiceService.AddEInvoiceRequest(eInvoiceRegistrationData, userId);

            return Ok(new { Id = eInvoiceRequest.EInvoiceRequestId });
        }
        catch (Exception ex)
        {
            Logger.LogException(ex, "InvoiceRegistrationRequestController.CreateEInvoiceRegistrationRequest");
            return BadRequest(new { message = ex.Message });
        }
    }
}