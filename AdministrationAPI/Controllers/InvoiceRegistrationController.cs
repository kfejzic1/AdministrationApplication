using AdministrationAPI.Contracts.Requests.EInvoiceRegistration;
using AdministrationAPI.Contracts.Responses.EInvoiceRegistration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdministrationAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class InvoiceRegistrationController : ControllerBase
{
    [HttpGet("required-data")]
    public async Task<IActionResult> ReturnRequiredDataForB2B([FromQuery] string B2BName)
    {
        //TODO: from database pull data that B2B requires 
        //remove this hardcoded data
        return Ok(new EInvoiceDataRequired
        {
            Field1 = "JMBG",
            Field2 = "Address",
            Field3 = null, 
            Field4 = null
        });
    }

    [HttpPost("registration-request")]
    public async Task<IActionResult> CreateEInvoiceRegistrationRequest([FromBody] EInvoiceRegistrationData eInvoiceRegistrationData)
    {
        //TODO: save this registration request to database 
        //so admin can approve it, or deny it 
        //create mapping in automapper from this object to database entity (depends on column naming in DB)

        return Ok();
    }
}