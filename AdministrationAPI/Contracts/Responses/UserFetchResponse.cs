namespace AdministrationAPI.Contracts.Responses
{
    public class UserFetchResponse
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public IEnumerable<string> Errors { get; set; }
    }
}