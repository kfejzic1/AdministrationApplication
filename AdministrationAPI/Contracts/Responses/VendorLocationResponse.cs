namespace AdministrationAPI.Contracts.Responses
{
    public class VendorLocationResponse
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public int VendorId { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }
    }
}