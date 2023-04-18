using AdministrationAPI.Data;
using AdministrationAPI.DTOs;
using AdministrationAPI.Contracts.Requests;
using AutoMapper;
using AdministrationAPI.Models.Transaction;
using AdministrationAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Security.Authentication;
using AdministrationAPI.Models;
using AdministrationAPI.DTOs.Transaction;

namespace AdministrationAPI.Services
{
  public class TransactionService : ITransactionService
  {
    private readonly IMapper _mapper;
    private readonly DBContext _context;
    static HttpClient client = new HttpClient();

    public TransactionService(IMapper mapper, DBContext context)
    {
      _mapper = mapper;
      _context = context;

    }


    public async Task<List<TransactionDTO>> GetTransactions(string token, TransactionQueryOptions options)
    {
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5ZjViNTg2ZS01YTFmLTRhOWYtODlhMi1hNmMxNDllNDA4MTUiLCJVc2VyTmFtZSI6Im1rb2tvcjIiLCJqdGkiOiI5MGQxN2ZkYS00NzQ2LTQ2M2MtOTdiYy00ZWFlN2ExY2M0NmYiLCJleHAiOjE2ODE4NTQyMTQsImlzcyI6Imh0dHA6Ly9zaXByb2pla2F0LmR1Y2tkbnMub3JnOjUwNTEiLCJhdWQiOiJodHRwOi8vc2lwcm9qZWthdC5kdWNrZG5zLm9yZzozMDAwIn0.uOWMfBPe_WqIv0B4NnII8o9bLfXZ1-r3KUIPr4k45zk";
      string query = "?token=" + token;
      query += (options.PageNumber != null) ? "&PageNumber=" + options.PageNumber.ToString() : "";
      query += (options.PageSize != null) ? "&PageSize=" + options.PageSize.ToString() : "";
      query += (options.AmountStartFilter != null) ? "&AmountStartFilter=" + options.AmountStartFilter : "";
      query += (options.AmountEndFilter != null) ? "&AmountEndFilter=" + options.AmountEndFilter : "";
      query += (options.CurrencyFilter != null) ? "&CurrencyFilter=" + options.CurrencyFilter : "";
      query += (options.TransactionTypeFilter != null) ? "&TransactionTypeFilter=" + options.TransactionTypeFilter : "";
      query += (options.RecipientNameFilter != null) ? "&RecipientNameFilter=" + options.RecipientNameFilter : "";
      query += (options.RecipientAccountNumberFilter != null) ? "&recipientAccountNumberFilter=" + options.RecipientAccountNumberFilter : "";
      query += (options.SenderNameFilter != null) ? "&SenderNameFilter=" + options.SenderNameFilter : "";
      if (options.DateTimeStart != null)
      {
        DateTime start = options.DateTimeStart ?? DateTime.Now;
        query += "&CreatedAtStartFilter=" + start.ToString("s");
      }
      if (options.DateTimeEnd != null)
      {
        DateTime end = options.DateTimeEnd ?? DateTime.Now;
        query += "&CreatedAtStartFilter=" + end.ToString("s");
      }
      query += (options.sortOrder != null) ? "&sortingOrder=" + options.sortOrder : "";



      Console.WriteLine("Generated Query is: " + query);

      var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Transaction/GetTransactionsForUser" + query);
      var trans = await response.Content.ReadAsAsync<List<TransactionDTO>>();
      return trans;
    }



    public async Task<TransactionDetailsDTO> GetTransactionByID(int id, string userId)
    {
      var dbTransaction = await _context.Transactions.FirstOrDefaultAsync(transaction => transaction.Id == id);
      if (dbTransaction is null) throw new Exception("No transaction corresponds to the given id.");
      if (dbTransaction.UserId != userId && dbTransaction.Recipient != userId)
      {
        throw new Exception("You don't have Transaction with this ID");
      }
      return _mapper.Map<TransactionDetailsDTO>(dbTransaction);
    }

    public async Task<TransactionDetailsDTO> CreateTransaction(TransactionCreateRequest req)
    {
      var transaction = new Transaction();
      transaction.Account = req.Account;
      transaction.Amount = req.Amount;
      transaction.DateTime = req.DateTime;
      transaction.UserId = req.UserId;
      transaction.Recipient = req.Recipient;
      transaction.Status = req.Status;
      transaction.Type = req.Type;
      _context.Transactions.Add(transaction);
      await _context.SaveChangesAsync();
      return _mapper.Map<TransactionDetailsDTO>(transaction);
    }

    public async Task<List<TransactionTransfer>> GetGroupedTransactionsByType(string token)
    {
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5ZjViNTg2ZS01YTFmLTRhOWYtODlhMi1hNmMxNDllNDA4MTUiLCJVc2VyTmFtZSI6Im1rb2tvcjIiLCJqdGkiOiJkMjdiMzZjYS04MWYxLTQ2NjAtYWY0Yi02ZmEyZWNmZmQwZWEiLCJleHAiOjE2ODE4NTMyMTMsImlzcyI6Imh0dHA6Ly9zaXByb2pla2F0LmR1Y2tkbnMub3JnOjUwNTEiLCJhdWQiOiJodHRwOi8vc2lwcm9qZWthdC5kdWNrZG5zLm9yZzozMDAwIn0.9wJnEBKRPVdxiUEzmCYH7vvPNYVeTWJ_l02SOV32R_8";
      HttpClient client = new HttpClient();
      var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Transaction/GroupTransactionsByType?token=" + token);
      if (response.IsSuccessStatusCode)
      {
        var transactions = await response.Content.ReadFromJsonAsync<List<TransactionTransfer>>();
        if (transactions == null)
        {
          throw new Exception("No transactions found.");
        }
        return transactions;
      }
      throw new AuthenticationException("Invalid token!");
    }

    public async Task<List<TransactionTransfer>> GetGroupedTransactionsByCurrency(string token)
    {
      token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiI5ZjViNTg2ZS01YTFmLTRhOWYtODlhMi1hNmMxNDllNDA4MTUiLCJVc2VyTmFtZSI6Im1rb2tvcjIiLCJqdGkiOiJkMjdiMzZjYS04MWYxLTQ2NjAtYWY0Yi02ZmEyZWNmZmQwZWEiLCJleHAiOjE2ODE4NTMyMTMsImlzcyI6Imh0dHA6Ly9zaXByb2pla2F0LmR1Y2tkbnMub3JnOjUwNTEiLCJhdWQiOiJodHRwOi8vc2lwcm9qZWthdC5kdWNrZG5zLm9yZzozMDAwIn0.9wJnEBKRPVdxiUEzmCYH7vvPNYVeTWJ_l02SOV32R_8";

      HttpClient client = new HttpClient();
      var response = await client.GetAsync("https://processingserver.herokuapp.com/api/Transaction/GroupTransactionsByCurrency?token=" + token);
      if (response.IsSuccessStatusCode)
      {
        var transactions = await response.Content.ReadFromJsonAsync<List<TransactionTransfer>>();
        if (transactions == null)
        {
          throw new Exception("No transactions found.");
        }
        return transactions;
      }
      throw new AuthenticationException("Invalid token!");
    }
  }
}