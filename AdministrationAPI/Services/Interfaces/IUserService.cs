﻿using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface IUserService
    {
        Task<AuthenticationResult> Login(LoginRequest loginRequest);
        Task<AuthenticationResult> Login2FA(Login2FARequest loginRequest);
        List<User> GetAllUsers();
    }
}
