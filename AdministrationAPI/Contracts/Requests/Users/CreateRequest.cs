﻿using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Contracts.Requests.Users
{
    public class CreateRequest
    {
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string PhoneNumber { get; set; }
    }
}