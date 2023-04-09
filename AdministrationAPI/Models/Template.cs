using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AdministrationAPI.Models
{
    public class Template
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)] 
        public int Id { get; set; }

        public string UserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Amount { get; set; } = string.Empty;
        
        public string PaymentType { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Currency { get; set; } = string.Empty;

        public string RecipientName { get; set; } = string.Empty;

        public string RecipientAccountNumber { get; set; } = string.Empty;
    }
}