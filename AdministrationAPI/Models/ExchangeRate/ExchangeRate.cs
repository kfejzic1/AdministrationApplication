using System;

public class ExchangeRate
{
	public string Id { get; set; }
	public string InputCurrencyId { get; set; }
	public string OutputCurrencyId { get; set; }
	public Currency InputCurrency { get; set; }
	public Currency OutputCurrency { get; set; }
	public DateOnly StartDate { get; set; }
	public DateOnly? EndDate { get; set; }
}
