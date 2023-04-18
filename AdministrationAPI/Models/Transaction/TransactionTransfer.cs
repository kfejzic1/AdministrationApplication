using AdministrationAPI.DTOs;

namespace AdministrationAPI.Models.Transaction

{
  public class TransactionTransfer
  {
    public string KeyValue { get; set; }
    public List<TransactionDTO> Transactions { get; set; }
    public float TotalAmount { get; set; }
    public int NumberOfTransactions { get; set; }
  }
}