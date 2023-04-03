namespace AdministrationAPI.Controllers;

using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using Newtonsoft.Json.Linq;
using Facebook;
using Google.Apis.Auth;
using AdministrationAPI.Services;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Models;
using AdministrationAPI.Helpers;

[AllowAnonymous]
[ApiController]
[Route("api/[controller]")]
public class RegisterController : ControllerBase
{
    private IUserService _userService;
    private IActivationCodeService _activationCodeService;
    private IMapper _mapper;
    private readonly IConfiguration _config;

    public RegisterController(
        IUserService userService,
        IActivationCodeService activationCodeService,
        IMapper mapper,
        IConfiguration config)
    {
        _userService = userService;
        _activationCodeService = activationCodeService;
        _mapper = mapper;
        _config = config;
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterRequest model)
    {
        var user = await _userService.Register(model);

        Random random = new Random();
        String emailCode = random.Next(1000, 9999).ToString();
        String smsCode = random.Next(1000, 9999).ToString();

        ActivationCode activationCode = new ActivationCode
        {
            Id = new Guid(),
            EmailCode = emailCode,
            SMSCode = smsCode,
            ActivatedEmail = false,
            ActivatedSMS = false,
            User = user
        };

        await _activationCodeService.SaveCodeAsync(activationCode);

        EmailSender emailSender = new EmailSender();
        await emailSender.SendEmailAsync(user.Email, emailCode);


        return Ok(new { message = "Registration successful" });
    }

    [AllowAnonymous]
    [HttpGet("phone")]
    public async Task<IActionResult> SendCodeToPhone([FromQuery] SMSInformationRequest smsInformationRequest)
    {
        User user;
        try
        {
            user = _userService.GetUserByName(smsInformationRequest.Username);
        }
        catch
        {
            return NotFound(new { message = "User with specified username not found!" });
        }


        ActivationCode activationCodeForUser = await _activationCodeService.GetCodeForUser(user.Id);

        if (activationCodeForUser == null)
        {
            return NotFound(new { message = "User not found" });
        }

        SMSSender SMSsender = new SMSSender(_config);
        SMSsender.SendSMS(user.PhoneNumber, activationCodeForUser.SMSCode);

        return Ok(new { message = "SMS delivered" });
    }

    [AllowAnonymous]
    [HttpPost("confirm/email")]
    public async Task<IActionResult> ConfirmEmail([FromBody] ActivationRequest activationRequest)
    {
        bool activationResult = await _activationCodeService.ActivateEmailCodeAsync(activationRequest.Code, activationRequest.Username);
        if (activationResult)
        {
            return Ok(new { message = "Activation successful" });
        }
        else
        {
            return BadRequest(new { message = "Username or code incorrect!" });
        }
    }

    [AllowAnonymous]
    [HttpPost("confirm/phone")]
    public async Task<IActionResult> ConfirmPhone([FromBody] ActivationRequest activationRequest)
    {
        bool activationResult = await _activationCodeService.ActivateSMSCodeAsync(activationRequest.Code, activationRequest.Username);
        if (activationResult)
        {
            return Ok(new { message = "Activation successful" });
        }
        else
        {
            return BadRequest(new { message = "Username or code incorrect!" });
        }
    }

    [AllowAnonymous]
    [HttpGet("validate/facebook")]
    public async Task<IActionResult> ValidateFacebookToken([FromQuery] string token)
    {
        var facebookClient = new FacebookClient(token);

        try
        {
            dynamic result = await facebookClient.GetTaskAsync("me", new { fields = "id,name,email,last_name" });

            var user = _userService.GetUserByEmail(result.email);

            if (user is not null) {
                return Ok(new { tokenStatus = "Token valid", email = user.Email, registration = "Required" });
            }
            else {
                return Ok(new { tokenStatus = "Token valid", registration = "Not required" });
            }
        }
        catch
        {
            return BadRequest(new { message = "Token invalid" });
        }
    }


    [AllowAnonymous]
    [HttpGet("validate/google")]
    public async Task<IActionResult> ValidateGoogleToken([FromQuery] string token)
    {
        throw new NotImplementedException("Google Auth not implemented yet!");
        // GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings()
        // {
        //     Audience = new[] { "630472771975-lerdhn72ooj165d8rt444oeone5tiak5.apps.googleusercontent.com" }
        // };

        // try {
        //     GoogleJsonWebSignature.Payload payload = await GoogleJsonWebSignature.ValidateAsync(model.token);

        //     return Ok(new { message = "Token valid" });
        // }
        // catch {
        //     return BadRequest(new { message = "Token invalid" });
        // }

        // "https://oauth2.googleapis.com/tokeninfo?access_token=ACCESS_TOKEN"

        var httpClient = new HttpClient();
        var response = await httpClient.GetAsync($"https://oauth2.googleapis.com/tokeninfo?access_token={token}");
        var content = response.Content.ReadAsStringAsync().Result;

        var temporaryString = @"    ""issued_at"": ""1420262924658"",
    ""scope"": ""READ"",
    ""application_name"": ""ce1e94a2-9c3e-42fa-a2c6-1ee01815476b"",
    ""refresh_token_issued_at"": ""1420262924658"",
    ""status"": ""approved"",
    ""refresh_token_status"": ""approved"",
    ""api_product_list"": ""[PremiumWeatherAPI]"",
    ""expires_in"": ""1799"", //--in seconds
    ""developer.email"": ""tesla@weathersample.com"",
    ""organization_id"": ""0"",
    ""token_type"": ""BearerToken"",
    ""refresh_token"": ""fYACGW7OCPtCNDEnRSnqFlEgogboFPMm"",
    ""client_id"": ""5jUAdGv9pBouF0wOH5keAVI35GBtx3dT"",
    ""access_token"": ""2l4IQtZXbn5WBJdL6EF7uenOWRsi"",
    ""organization_name"": ""docs"",
    ""refresh_token_expires_in"": ""86399"", //--in seconds
    ""refresh_count"": ""0""";

    var commaSeparated = temporaryString.Split(",");

    var expiresInAttribute = commaSeparated.FirstOrDefault(attribute => attribute.Contains("expires_in"));
    
    var expiresInSeparated = expiresInAttribute!.Split(":");

    // Ovaj sadrzi expires_in
    // expiresInSeparated[0];

    // Ovaj sadrzi broj, u ovom slucaju 1799
    // expiresInSeparated[1];
        //content.Split(",")
        return Ok(expiresInSeparated[1]);

    }

    [AllowAnonymous]
    [HttpGet("validate/microsoft")]
    public async Task<IActionResult> ValidateMicrosoftToken([FromQuery] string token)
    {
        throw new NotImplementedException("Microsoft Auth not implemented yet!");
        var handler = new JwtSecurityTokenHandler();
        var jwtToken = handler.ReadJwtToken(token);

        return Ok(jwtToken.ValidTo);
    }
}