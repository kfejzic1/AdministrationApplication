using AdministrationAPI.Models;

namespace AdministrationAPI.Contracts.Requests.Transactions


{
    public class ClaimUpdateRequest
    {
        public int TransactionClaimId { get; set; }
        public TransactionClaimStatus ClaimStatus { get; set; }    //update status of the claim

        public ClaimUpdateRequest()
        {

        }
    }
}
