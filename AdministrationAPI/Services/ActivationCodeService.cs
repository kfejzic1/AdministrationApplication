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

public class ActivationCodeService : IActivationCodeService
{
    private AppDbContext _context;
    private UserManager<User> _userManager;
    private IUserService _userService;

    public ActivationCodeService(
        AppDbContext context,
        UserManager<User> userManager,
        IUserService userService)
    {
        _context = context;
        _userManager = userManager;
        _userService = userService;
    }
    

    public async Task<bool> ActivateEmailCodeAsync(string code, string username)
    {
        var activationCode = await _context.ActivationCodes.Include(rc => rc.User).FirstOrDefaultAsync(rc => rc.EmailCode == code && rc.User.UserName == username && rc.ActivatedEmail == false);
        if (activationCode is null)
        {
            return false;
        }

        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == username);
        user.EmailConfirmed = true;
        await _userManager.UpdateAsync(user);
        // await _userManager.SaveChangesAsync();

        activationCode.ActivatedEmail = true;
        _context.ActivationCodes.Update(activationCode);
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ActivateSMSCodeAsync(string code, string username)
    {
        var activationCode = await _context.ActivationCodes.Include(rc => rc.User).FirstOrDefaultAsync(rc => rc.SMSCode == code && rc.User.UserName == username && rc.ActivatedSMS == false);
        if (activationCode is null)
        {
            return false;
        }
        activationCode.ActivatedSMS = true;
        _context.ActivationCodes.Update(activationCode);
        await _context.SaveChangesAsync();

        var user = _userService.GetUserByName(username);
        user.PhoneNumberConfirmed = true;
        await _userManager.UpdateAsync(user);

        return true;
    }

    public async Task<bool> GenerateCodeForUserAsync(User user)
    {
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

        _context.ActivationCodes.Add(activationCode);
        await _context.SaveChangesAsync();

        EmailSender emailSender = new EmailSender();
        try
        {
            await emailSender.SendEmailAsync(user.Email, emailCode);
            return true;
        }
        catch (Exception ex)
        {
            LoggerUtility.Logger.LogException(ex, "ActivationCodeService.GenerateCodeForUserAsync");
            return false;
        }
    }

    public async Task<ActivationCode> GetCodeForUser(string id)
    {
        ActivationCode activationCode = await _context.ActivationCodes.Where(ac => ac.UserId.Equals(id)).FirstOrDefaultAsync();

        return activationCode;
    }
}