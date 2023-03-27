﻿namespace AdministrationAPI.Contracts.Requests
{
    public class VendorCreateRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CompanyDetails { get; set; }
        public string? Phone { get; set; }
        public DateTime? Created { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? Modified { get; set; }
        public int? ModifiedBy { get; set; }
        public List<string> AssignedUserIds { get; set; }
    }
}
