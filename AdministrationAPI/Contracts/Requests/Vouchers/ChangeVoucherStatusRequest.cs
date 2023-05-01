namespace AdministrationAPI.Contracts.Requests.Vouchers
{
    public class ChangeVoucherStatusRequest
    {
        public string Code { get; set; }
        public string StatusId { get; set; }
        public string? Username { get; set; }
    }
}
