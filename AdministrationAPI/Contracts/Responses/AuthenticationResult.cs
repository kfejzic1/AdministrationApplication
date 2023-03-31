﻿namespace AdministrationAPI.Contracts.Responses
{
    public class AuthenticationResult
    {
        public string? Token { get; set; }
        public bool Success { get; set; }
        public bool IsTwoFactorEnabled { get; set; }
        public string QrCodeImageUrl { get; set; }
        public string ManualEntrySetupCode { get; set; }
        public string SecKey { get; set; } 
        public IEnumerable<string> Errors { get; set; }
    }
}
