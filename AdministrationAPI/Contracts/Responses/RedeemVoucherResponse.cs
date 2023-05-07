using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Responses
{
    public class RedeemVoucherResponse
    {
        public double Amount { get; set; }
        public string AccountNumber { get; set; }
       // public RedeemVoucherResponse(double amount,string acc) { 
       // AccountNumber = acc;
        //    Amount = amount;
        //}
    }
}
