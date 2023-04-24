namespace AdministrationAPI.Models;

public class ExchangeRate
{
	public string Id { get; set; }
	public string InputCurrencyId { get; set; }
    public Currency InputCurrency { get; set; }
    public string OutputCurrencyId { get; set; }
	public Currency OutputCurrency { get; set; }
    public double Rate { get; set; }
    public DateTime StartDate { get; set; }
	public DateTime? EndDate { get; set; }
}
