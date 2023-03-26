using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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