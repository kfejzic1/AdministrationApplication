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

    public async Task SaveCodeAsync(ActivationCode code)
    {
        _context.ActivationCodes.Add(code);
        await _context.SaveChangesAsync();
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

    public async Task<ActivationCode> GetCodeForUser(string id)
    {
        ActivationCode activationCode = await _context.ActivationCodes.Where(ac => ac.UserId.Equals(id)).FirstOrDefaultAsync();

        return activationCode;
    }
}