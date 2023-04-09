using Microsoft.EntityFrameworkCore;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Models;
using AdministrationAPI.Data;

namespace AdministrationAPI.Services
{
    public class TemplateService : ITemplateService
    {
        /*
        private static List<Template> templates = new List<Template> {
            new Template { Id=1, UserId="1", Title="Plin", Description="placanje racuna za plin", Currency="BAM", 
            RecipientName="sarajevoGas", RecipientAccountNumber="123456" },
            new Template { Id=2, UserId="2", Title="Voda", Description="placanje racuna za vodu", Currency="BAM", 
            RecipientName="vodovod", RecipientAccountNumber="123457" }
        };
        */

        private readonly TemplateDbContext _context;

        public TemplateService(TemplateDbContext context) {
            _context=context;
        }

        public async Task<List<Template>> GetAllTemplates(string userId)
        {
            return await _context.Templates.Where(t => t.UserId == userId).ToListAsync();
        }


        public async Task<Template?> GetOneTemplate(int id)
        {
            var template=await _context.Templates.FindAsync(id);
            if(template is null) {
                return null;
            }
            return template;
        }

        public async Task<List<Template>> AddTemplate(Template template)
        {
            _context.Templates.Add(template);
            await _context.SaveChangesAsync();

            return await _context.Templates.ToListAsync();
        }

        public async Task<List<Template>?> UpdateTemplate(int id, Template request)
        {
            var template=await _context.Templates.FindAsync(id);
            if(template is null) {
                return null;
            }
            template.UserId=request.UserId;
            template.Title=request.Title;
            template.Description=request.Description;
            template.Currency=request.Currency;
            template.RecipientName=request.RecipientName;
            template.RecipientAccountNumber=request.RecipientAccountNumber;

            await _context.SaveChangesAsync();
            return await _context.Templates.ToListAsync();
        }

        public async Task<List<Template>?> DeleteTemplate(int id)
        {
            var template=await _context.Templates.FindAsync(id);
            if(template is null) {
                return null;
            }
            _context.Templates.Remove(template);
            await _context.SaveChangesAsync();

            return await _context.Templates.ToListAsync();
        }
       
    }
}
