using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Data;
using AdministrationAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AdministrationAPI.Utilities
{
    public class TokenUtilities
    {

        public static async Task<string> CreateTokenAsync(List<Claim> authClaims, IConfiguration configuration, AppDbContext context)
        {
            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:Secret"]));

            var token = new JwtSecurityToken(
                issuer: configuration["Token:ValidIssuer"],
                audience: configuration["Token:ValidAudience"],
                expires: DateTime.Now.AddMinutes(30),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            var newToken = new JwtSecurityTokenHandler().WriteToken(token);

            context.TokenValidities.Add(new TokenValidity
            {
                Id = Guid.NewGuid(),
                Token = newToken,
                IsValid = true
            });
            await context.SaveChangesAsync();

            return newToken;
        }

        public static async Task<List<Claim>> GetAuthClaimsAsync(User user, UserManager<User> userManager)
        {
            var authClaims = new List<Claim>
            {

                    new Claim("UserId", user.Id),
                    new Claim("UserName", user.UserName),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                };

            var userRoles = await userManager.GetRolesAsync(user);

            foreach (var role in userRoles)
            {
                authClaims.Add(new Claim(ClaimTypes.Role, role));
            }

            return authClaims;
        }

        public static TokenVerificationResult VerifyToken(string jwt)
        {
            var handler = new JwtSecurityTokenHandler();
            var token = handler.ReadJwtToken(jwt);

            var userNameClaim = token.Claims.FirstOrDefault(c => c.Type == "UserName").Value;
            var roleClaims = token.Claims.Where(c => c.Type == ClaimTypes.Role).ToList();

            var roleValues = roleClaims.Select(c => c.Value).ToList();

            if (userNameClaim == null)
            {
                return new TokenVerificationResult
                {
                    Errors = new[] { "User not found!" }
                };

            }
            return new TokenVerificationResult
            {
                Username = userNameClaim,
                Roles = roleValues
            };
        }
    }
}
