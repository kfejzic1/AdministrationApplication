namespace AdministrationAPI.Services;

using AutoMapper;
using BCrypt.Net;
using Microsoft.EntityFrameworkCore;
using AdministrationAPI.Utilities;
using AdministrationAPI.Models;
//using AdministrationAPI.Helpers;
using AdministrationAPI.Data;
using System;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Services;
using Microsoft.AspNetCore.Identity;
using AdministrationAPI.Helpers;
using Microsoft.Extensions.Configuration;
using Twilio.Rest.Routes.V2;

public class ActivationCodeService : IActivationCodeService
{
    private AppDbContext _context;
    private UserManager<User> _userManager;
    private IUserService _userService;
    private IConfiguration _config;

    public ActivationCodeService(
        AppDbContext context,
        UserManager<User> userManager,
        IUserService userService,
        IConfiguration config)
    {
        _context = context;
        _userManager = userManager;
        _userService = userService;
        _config = config;
    }
    

    public async Task<bool> ActivateEmailCodeAsync(string code, string username)
    {
        var activationCode = await _context.EmailActivationCodes.Include(rc => rc.User).FirstOrDefaultAsync(rc => rc.Code == code && rc.User.UserName == username);
        if (activationCode is null)
        {
            return false;
        }

        var user = activationCode.User;

        if (user is null)
        {
            return false;
        }

        if (!user.EmailConfirmed)
        {
            user.EmailConfirmed = true;
            await _userManager.UpdateAsync(user);
            // await _userManager.SaveChangesAsync();
        }

        _context.EmailActivationCodes.Remove(activationCode);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ActivateSMSCodeAsync(string code, string username)
    {
        var activationCode = await _context.SMSActivationCodes.Include(rc => rc.User).FirstOrDefaultAsync(rc => rc.Code == code && rc.User.UserName == username);
        if (activationCode is null)
        {
            return false;
        }

        var user = activationCode.User;

        if (user is null)
        {
            return false;
        }

        if (!user.PhoneNumberConfirmed)
        {
            user.PhoneNumberConfirmed = true;
            await _userManager.UpdateAsync(user);
            // await _userManager.SaveChangesAsync();
        }

        _context.SMSActivationCodes.Remove(activationCode);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> GenerateEmailActivationCodeForUserAsync(User user)
    {
        var existingActivationCode = await _context.EmailActivationCodes.Include(eac => eac.User).FirstOrDefaultAsync(eac => eac.User == user);
        if (existingActivationCode is not null)
        {
            _context.EmailActivationCodes.Remove(existingActivationCode);
            await _context.SaveChangesAsync();
        }

        Random random = new Random();
        String code = random.Next(1000, 9999).ToString();

        EmailActivationCode activationCode = new EmailActivationCode
        {
            Id = Guid.NewGuid().ToString(),
            Code = code,
            User = user
        };

        _context.EmailActivationCodes.Add(activationCode);
        await _context.SaveChangesAsync();

        EmailSender emailSender = new EmailSender(_config);
        try
        {
            await emailSender.SendEmailAsync(user.Email, code);
            return true;
        }
        catch (Exception ex)
        {
            LoggerUtility.Logger.LogException(ex, "ActivationCodeService.GenerateEmailActivationCodeForUserAsync");
            return false;
        }
    }

    public async Task<bool> GenerateSMSActivationCodeForUserAsync(User user)
    {
        var existingActivationCode = await _context.SMSActivationCodes.Include(eac => eac.User).FirstOrDefaultAsync(eac => eac.User == user);
        if (existingActivationCode is not null)
        {
            _context.SMSActivationCodes.Remove(existingActivationCode);
            await _context.SaveChangesAsync();
        }

        Random random = new Random();
        String code = random.Next(1000, 9999).ToString();

        SMSActivationCode activationCode = new SMSActivationCode
        {
            Id = Guid.NewGuid().ToString(),
            Code = code,
            User = user
        };

        _context.SMSActivationCodes.Add(activationCode);
        await _context.SaveChangesAsync();

        try
        {
            SMSSender SMSsender = new SMSSender(_config);
            SMSsender.SendSMS(user.PhoneNumber, code);

            return true;
        }
        catch (Exception ex)
        {
            LoggerUtility.Logger.LogException(ex, "ActivationCodeService.GenerateSMSActivationCodeForUserAsync");
            return false;
        }
    }
}