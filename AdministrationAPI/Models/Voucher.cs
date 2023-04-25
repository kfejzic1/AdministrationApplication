using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models
{
    public class Voucher
    {
        public enum Status { ISSUED = 0, ACTIVE = 1, REDEEMED = 2, VOID = 3};
        public int Id { get; set; }
        public int Amount { get; set; }
        public Currency Currency { get; set; }
        public string Code { get; set; }

        [EnumDataType(typeof(Status))]
        public Status CurrentStatus { get; set; }
        public User? User { get; set; }
        public string? UserId { get; set; }

    }
}
