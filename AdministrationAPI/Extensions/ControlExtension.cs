namespace AdministrationAPI.Extensions
{
    public static class ControlExtensions
    {
        public static string GetId(HttpContext httpContext)
        {
            if (httpContext.User == null) return "none";
            var identity = httpContext.User.FindFirst("UserId");


            return identity.Value;
        }

        public static string GetToken(HttpContext httpContext)
        {

            var authHeader = httpContext.Request.Headers["Authorization"].FirstOrDefault();
            if (authHeader == null || !authHeader.StartsWith("Bearer "))
            {
                throw new Exception("Invalid or missing Authorization header");
            }

            var tokenValue = authHeader.Substring("Bearer ".Length).Trim();

            return tokenValue;
        }

    }
}