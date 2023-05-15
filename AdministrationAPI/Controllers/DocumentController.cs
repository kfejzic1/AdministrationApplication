using AdministrationAPI.Contracts.Requests.Vendors;
using AdministrationAPI.Extensions;
using AdministrationAPI.Models;
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
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class DocumentController : Controller
    {
        private readonly IDocumentService _documentService;
        private readonly IUserService _userService;

        public DocumentController(IUserService userService, IDocumentService documentService)
        {
            _userService = userService;
            _documentService = documentService;
        }
        
        [HttpPost("UploadDocument")]
        [RequestFormLimits(ValueLengthLimit = int.MaxValue, MultipartBodyLengthLimit = int.MaxValue)]
        public IActionResult UploadDocument([FromForm] IFormFile file)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                var httpRequest = HttpContext.Request;
                if (httpRequest.Form.Files.Count > 0)
                {
                    //var file = httpRequest.Form.Files[0];
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var document = new Document
                        {
                            FileName = file.FileName.ToString(),
                            Folder = httpRequest.Form["Folder"].ToString() + '/' + httpRequest.Form["NodeName"].ToString(),
                            CreatedBy = ControlExtensions.GetId(HttpContext),
                            Created = DateTime.Now,
                        };
                        return Ok(_documentService.UploadDocument(ms, document));
                    }
                }
                else return BadRequest("No file available!");
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

        [HttpDelete("{id}")]
        public IActionResult DeleteDocument([FromRoute] int id)
        {
            try
            {
                _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
                return Ok(_documentService.DocumentDelete(id));
            }
            catch (DataException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                LoggerUtility.Logger.LogException(ex, "VendorController.PaymentTerms");
                return StatusCode(500, ex.Message);
            }
        }
    }
}
