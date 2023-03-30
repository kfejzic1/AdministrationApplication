namespace AdministrationAPI.DTOs.Transaction
{
    public class TransactionResponseDTO
    {
        public List<TransactionDTO> Transactions { get; set; } = new List<TransactionDTO>();
        public int Pages { get; set; }
        public int CurrentPage { get; set; }
    }
}