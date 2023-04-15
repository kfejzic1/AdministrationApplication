using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace AdministrationAPI.Contracts.Responses
{
    public class POSResponse
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [ForeignKey("Location")]
        public int LocationId { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }}
    
}