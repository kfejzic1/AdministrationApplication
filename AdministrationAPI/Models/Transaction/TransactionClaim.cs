using Mysqlx.Crud;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AdministrationAPI.Models.Transaction
{
    public class TransactionClaim
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public int TransactionId { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }

        public TransactionClaimStatus Status { get; set; }

        public TransactionClaim()
        {
            TransactionId = -1;
            Subject = string.Empty;
            Description = string.Empty;
            Status = TransactionClaimStatus.Open;
        }
    }
}