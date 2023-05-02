using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Responses
{
    public class VoucherDataResponse
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public string CurrencyId { get; set; }
        public string Code { get; set; }
        public string VoucherStatusId { get; set; }
        public string CreatedBy { get; set; }
        public string? RedeemedBy { get; set; }
    }
}
