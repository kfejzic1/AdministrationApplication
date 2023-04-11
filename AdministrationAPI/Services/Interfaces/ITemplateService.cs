using AdministrationAPI.Models;

namespace AdministrationAPI.Services.Interfaces
{
    public interface ITemplateService
    {
        Task<List<Template>> GetAllTemplates(string userId);
        Task<Template?> GetOneTemplate(int id);
        Task<List<Template>> AddTemplate(Template template);
        Task<List<Template>?> UpdateTemplate(int id, Template request);
        Task<List<Template>?> DeleteTemplate(int id);
    }
}
