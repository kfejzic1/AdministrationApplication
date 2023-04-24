using AdministrationAPI.Extensions;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using AdministrationAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using AdministrationAPI.Extensions;

namespace AdministrationAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    public class WeatherForecastController : ControllerBase
    {
        private readonly IUserService _userService;
        private static readonly string[] Summaries = new[]
        {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(IUserService userService, ILogger<WeatherForecastController> logger)
        {
            _userService = userService;
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            _userService.IsTokenValid(ControlExtensions.GetToken(HttpContext));
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}