using AdministrationAPI.Contracts.Requests;
using AdministrationAPI.Contracts.Requests.ExchangeRates;
using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using AutoMapper;

namespace AdministrationAPI.MappingProfiles
{
    public class ModelToDTProfile : Profile
    {
        public ModelToDTProfile()
        {
            CreateMap<AuthenticationResult, AuthSuccessResponse>();
            CreateMap<AuthenticationResult, AuthFailResponse>();
            CreateMap<RegisterRequest, User>();
        }
    }
}
