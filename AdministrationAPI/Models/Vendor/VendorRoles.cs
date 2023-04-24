namespace AdministrationAPI.Models.Vendor
{
    public class VendorRoles
    {
        public Guid Id { get; set; }

        public string Name { get; set; }    

        public string NormalizedName { get; set; }

        public string ConcurrencyStamp { get; set; }

        public VendorRoles() { }
    }
}
