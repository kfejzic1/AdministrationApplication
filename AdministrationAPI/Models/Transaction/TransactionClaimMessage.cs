using Mysqlx.Crud;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.Transaction
{
    public class TransactionClaimMessage
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public int TransactionClaimId { get; set; }
        public string Message { get; set; }
        public DateTime? Created { get; set; }
        public string UserId { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }
        public TransactionClaimMessage()
        {
            TransactionClaimId = -1;
            Message = UserId = string.Empty;
        }
    }
}