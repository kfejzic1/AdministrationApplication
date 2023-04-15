namespace AdministrationAPI.Contracts.Requests
{
    public class VendorLocationCreateRequest
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
        public DateTime? Created { get; set; }
        public string? CreatedBy { get; set; }
        public int VendorId { get; set; }
    }

    public class VendorLocationUpdateRequest
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public int VendorId { get; set; }
        public DateTime? Modified { get; set; }
        public string? ModifiedBy { get; set; }
    }

    public class VendorLocationDeleteRequest
    {
        public int Id { get; set; }
    }
    
}