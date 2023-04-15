namespace AdministrationAPI.Models;

public class Currency
{
	public string Id { get; set; }
    public string Country { get; set; }
    public string Name { get; set; }
	public ICollection<ExchangeRate> ExchangeRates { get; set; }
}
