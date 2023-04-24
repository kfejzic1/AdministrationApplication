using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models
{
    public class AccountRequest
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public string Id { get; set; }
        public Account Account { get; set; }
        public string AccountId { get; set; }
        public Document Document { get; set; }
        public string DocumentId { get; set; }


    }
}