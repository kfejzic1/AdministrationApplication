using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace AdministrationAPI.Models
{
    public class Document
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key, Column(Order = 0)]
        public int Id { get; set; }
        public string FileName { get; set; }
        public string Description { get; set; }
        public string Folder { get; set; }
        public string UNC { get; set; }
        public string Extension { get; set; }
        public string CreatedBy { get; set; }
        public string ModifiedBy { get; set; }
        public DateTime? Created { get; set; }
        public DateTime? Modified { get; set; }

        public Document()
        {
            FileName = string.Empty;
            Folder = string.Empty;
            Description = string.Empty;
            UNC = string.Empty;
            CreatedBy = string.Empty;
            ModifiedBy = string.Empty;
            Created = DateTime.Now;
            Modified = null;
        }
    }
}
