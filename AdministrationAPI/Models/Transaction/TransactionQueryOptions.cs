namespace AdministrationAPI.Models
{
  public class TransactionQueryOptions
  {
    public DateTime? DateTimeStart { get; set; }
    public DateTime? DateTimeEnd { get; set; }
    public string? RecipientNameFilter { get; set; }

    public string? CurrencyFilter { get; set; }

    public string? RecipientAccountNumberFilter { get; set; }
    public string? SenderNameFilter { get; set; }

    public string? TransactionTypeFilter { get; set; }
    public string? sortOrder { get; set; }

    public string CategoryFilter { get; set; }
    public bool? Ascending { get; set; }
    public int? PageNumber { get; set; }
    public int? PageSize { get; set; }
    public float? AmountStartFilter { get; set; }
    public float? AmountEndFilter { get; set; }
  }
}