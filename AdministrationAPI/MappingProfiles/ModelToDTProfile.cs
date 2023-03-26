using AdministrationAPI.Contracts.Responses;
using AutoMapper;

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
