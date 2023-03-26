using AdministrationAPI.Contracts.Responses;
using AdministrationAPI.Models;
using AutoMapper;
using System.Reflection;

namespace AdministrationAPI.MappingProfiles
{
    public class ModelToDTProfile : Profile
    {
        public ModelToDTProfile()
        {
            CreateMap<AuthenticationResult, AuthSuccessResponse>();
            CreateMap<AuthenticationResult, AuthFailResponse>();
        }
    }
}
