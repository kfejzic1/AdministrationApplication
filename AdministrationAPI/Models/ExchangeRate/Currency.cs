using System;

public class Currency
{
	public string Id { get; set; }
	public string Name { get; set; }
	public bool Default { get; set; } = false;
	public ICollection<ExchangeRate> ExchangeRates { get; set; }
}
