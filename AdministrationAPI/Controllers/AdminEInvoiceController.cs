using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;
//using AdministrationAPI.Models;
using AdministrationAPI.Models.EInvoiceForms;
using AdministrationAPI.Models;

namespace AdministrationAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  // [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public class AdminEInvoiceController : Controller
  {
    private IAdminEInvoiceService _adminEInvoiceService;

    public AdminEInvoiceController(IAdminEInvoiceService invoiceService)
    {
      _adminEInvoiceService = invoiceService;
    }
    

    [HttpGet("b2b/e-invoices/requests")]
    public async Task<ActionResult<List<EInvoiceRequest>>> GetInvoiceRequests()
    {
      var result = await _adminEInvoiceService.GetAllInvoiceRequests();
      return Ok(result);
    }

    [HttpGet("{b2bID}/e-invoices/requests/")]
    public async Task<List<EInvoiceRequest>> GetInvoiceRequestsByID(int b2bID)
    {

      var result = await _adminEInvoiceService.GetInvoiceRequestsByID(b2bID);
      return result;

    }

   
    [HttpPost("{requestID}/e-invoices/approve/")]
    public async Task<IActionResult> HandleRequestStatus([FromQuery] bool approve, int requestID)
    {
      try
      {
        var result = await _adminEInvoiceService.HandleRequestStatus(approve, requestID);
        return Ok(result);
      }

      catch (Exception e)
      {
        LoggerUtility.Logger.LogException(e, "AdminEInvoiceController.HandleRequestStatus");
        return StatusCode(500, e.Message);
      }
    }


    [HttpPost("{b2bID}/e-invoices/create")]
    public async Task<IActionResult> DefineRequiredDataForVendor(int b2bID, [FromBody] RequiredData data)
    {
      try
      {
        var result = await _adminEInvoiceService.DefineRequiredDataForVendor(b2bID, data);
        return Ok(result);
      }

      catch (Exception e)
      {
        LoggerUtility.Logger.LogException(e, "AdminEInvoiceController.DefineRequiredDataForVendor");
        return StatusCode(500, e.Message);
      }
    }



  }
}
