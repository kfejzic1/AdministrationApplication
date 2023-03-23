namespace AdministrationAPI.Models
{
    public class Vendor
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string CompanyDetails { get; set; }

        public Vendor()
        {
            Id = -1;
            Name = string.Empty;
            Address = string.Empty;
            CompanyDetails = string.Empty;
        }
    }
}
