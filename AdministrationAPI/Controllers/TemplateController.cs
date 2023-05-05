using AdministrationAPI.Extensions;
using Microsoft.AspNetCore.Mvc;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using AdministrationAPI.Extensions;

namespace AdministrationAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class TemplateController : ControllerBase
    {

        private readonly ITemplateService _templateService;
        private readonly IUserService _userService;

        public TemplateController(IUserService userService, ITemplateService templateService)
        {
            _userService = userService;
            _templateService = templateService;
        }

        [HttpGet]
        [Route("User/{userId}")]
        public async Task<ActionResult<List<Template>>> GetAllTemplates(string userId)
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            return await _templateService.GetAllTemplates(userId);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<List<Template>>> GetOneTemplate(int id)
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            var result = await _templateService.GetOneTemplate(id);
            if (result is null)
            {
                return NotFound("Sorry, this template doesn't exist.");
            }
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<List<Template>>> AddTemplate([FromBody] Template template)
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            var result = await _templateService.AddTemplate(template);
            return Ok(result);
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<ActionResult<List<Template>>> UpdateTemplate(int id, Template request)
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            var result = await _templateService.UpdateTemplate(id, request);
            if (result is null)
            {
                return NotFound("Sorry, this template doesn't exist.");
            }
            return Ok(result);
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<ActionResult<List<Template>>> DeleteTemplate(int id)
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            var result = await _templateService.DeleteTemplate(id);
            if (result is null)
            {
                return NotFound("Sorry, this template doesn't exist.");
            }
            return Ok(result);
        }
    }
}
