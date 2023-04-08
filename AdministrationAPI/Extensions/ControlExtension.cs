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
    }
}