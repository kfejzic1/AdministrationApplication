using AdministrationAPI.Data;
using AdministrationAPI.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AdministrationAPI.Utilities.TokenUtility
{
    public class TokenExpirationHandler
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;
        //private readonly UserManager<User> _userManager;


        public TokenExpirationHandler(RequestDelegate next, IConfiguration config)
        {
            _next = next;
            _config = config;
        }

        public async Task Invoke(HttpContext context, UserManager<User> userManager)
        {
            string accessToken = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (accessToken != null)
            {
                try
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = Encoding.ASCII.GetBytes(_config["Token:Secret"]);

                    // Validate token and get the user ID
                    var tokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ClockSkew = TimeSpan.Zero
                    };
                    var claimsPrincipal = tokenHandler.ValidateToken(accessToken, tokenValidationParameters, out var validatedToken);
                    var userId = claimsPrincipal.FindFirst(ClaimTypes.UserData)?.Value;
                    var user = userManager.Users.FirstOrDefault(u => u.Id == userId);

                    // Refresh token if it is about to expire
                    var secondsUntilExpire = (validatedToken.ValidTo - DateTime.UtcNow).TotalSeconds;
                    if (secondsUntilExpire < 60)
                    {
                        var authClaims = await TokenUtilities.GetAuthClaimsAsync(user, userManager);

                        var token = await TokenUtilities.CreateTokenAsync(authClaims, _config, _context);

                        context.Response.Headers.Append("Bearer", token);
                    }
                }
                catch (Exception)
                {
                    // Token is invalid or expired, do nothing
                }
            }

            await _next(context);
        }
    }

}
