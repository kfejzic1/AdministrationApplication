using AdministrationAPI.Models;
using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Contracts.Responses
{
    public class GetUserResponse
    {
        public User user { get; set; }
        public IEnumerable<string> userRole { get; set; }
    }
}
