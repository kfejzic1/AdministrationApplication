using AdministrationAPI.Models.Transaction;
using AdministrationAPI.DTOs;
using AutoMapper;

namespace AdministrationAPI.AutoMapperProfiles
{
    public class AutoMapperTransactionProfile : Profile
    {
        public AutoMapperTransactionProfile()
        {
            CreateMap<Transaction, TransactionDTO>();
            CreateMap<Transaction, TransactionDetailsDTO>();
        }
    }
}