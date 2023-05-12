using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models.Vendor;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Data;

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

  }
}
