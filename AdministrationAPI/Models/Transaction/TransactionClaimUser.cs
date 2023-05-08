using Mysqlx.Crud;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.Transaction
{
    public class TransactionClaimUser
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }

        public int TransactionClaimId { get; set; }

        public string UserId { get; set; }

        public string AdminId { get; set; }

        public TransactionClaimUser()
        {
            TransactionClaimId = -1;
            UserId = string.Empty;
            AdminId = string.Empty;
        }
    }
}