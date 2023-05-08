using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Models
{
    public class Account
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public User User { get; set; }
        public string UserId { get; set; }
        public string AccountNumber { get; set; }
        public Currency Currency { get; set; }
        public string CurrencyId { get; set; }
        public string Description { get; set; }
        [ForeignKey("AccountCreationRequest")]
        public int RequestId { get; set; }
    }
}