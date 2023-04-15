using Microsoft.EntityFrameworkCore;
using AdministrationAPI.Services.Interfaces;
using AdministrationAPI.Models;
using AdministrationAPI.Data;

namespace AdministrationAPI.Services
{
    public class TemplateService : ITemplateService
    {
        

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
            template.Amount = request.Amount;
            template.PaymentType = request.PaymentType;
            template.Description=request.Description;
            template.Currency=request.Currency;
            template.RecipientName=request.RecipientName;
            template.RecipientAccountNumber=request.RecipientAccountNumber;
            template.PhoneNumber=request.PhoneNumber;
            template.Category=request.Category;
            template.Received=request.Received;

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
