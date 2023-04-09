using System.ComponentModel.DataAnnotations.Schema;
namespace AdministrationAPI.Contracts.Requests
{
    public class POSCreateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int LocationId { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }
    }
    public class POSDeleteRequest
    {
        public int Id { get; set; }
    }
    public class POSUpdateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int LocationId { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }
    }
}