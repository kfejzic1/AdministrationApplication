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
using Microsoft.AspNetCore.Identity;
using AdministrationAPI.Contracts.Responses;

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


    //fixme: should these methods be in login controller??
    [AllowAnonymous]
    [HttpGet("validate/facebook")]
    public async Task<IActionResult> ValidateFacebookToken([FromQuery] string token)
    {
        var facebookClient = new FacebookClient(token);

        try
        {
            dynamic facebookAccessTokenData = await facebookClient.GetTaskAsync("me", new { fields = "id,name,email,last_name" });

            var user = _userService.GetUserByEmail(facebookAccessTokenData.email);

            if (user is null) {
                return NotFound(new { message = "User not found! Facebook Social Login requires previous registration!" });
            }
            else {
                return Ok(_userService.SocialLogin(facebookAccessTokenData.email));
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
        using(HttpClient httpClient = new HttpClient()) {
            try {
                GoogleAccessTokenData googleAccessTokenData = await httpClient.GetFromJsonAsync<GoogleAccessTokenData>("https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + token);

                var user = _userService.GetUserByEmail(googleAccessTokenData.Email);

                if (user is null) {
                    return NotFound(new { message = "User not found! Google Social Login requires previous registration!" });
                }
                else {
                    return Ok(await _userService.SocialLogin(googleAccessTokenData.Email));
                }
            }
            catch {
                return BadRequest(new { message = "Token invalid" });
            }
        }
    }
}