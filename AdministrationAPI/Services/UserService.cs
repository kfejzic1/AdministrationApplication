using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using AdministrationAPI.Services.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AdministrationAPI.Services
{
    public class UserService : IUserService
    {
        private readonly IConfiguration _configuration;

        public UserService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public AuthenticationResult Login(LoginRequest loginRequest)
        {
            //Fetch User From Database by email or phone from LoginRequest, password should be hashed
            var user = new User();
            user.Email = "test@gmail.com";
            user.Password = "$2a$11$L8nVoKKleO2vppTVIyoRMeq6UD6qwWniun.rtg22VsBaaac6DekFS"; //password je: string

            if (!BCrypt.Net.BCrypt.Verify(loginRequest.Password, user.Password))
            {
                return new AuthenticationResult
                {
                    Errors = new[] { "Email/Phone/Password combination mismatch!" }
                };
            }

            string token = CreateToken(user);

            return new AuthenticationResult
            {
                Success = true,
                Token = token
            };
        }

        private string CreateToken(User user)
        {
            List<Claim> claims= new List<Claim>
            {
                new Claim("email", user.Email),
                new Claim("name", user.Name),
                new Claim("phone", user.Phone)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("Authentication:Schemes:Bearer:SigningKeys:0:Value").Value!));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
