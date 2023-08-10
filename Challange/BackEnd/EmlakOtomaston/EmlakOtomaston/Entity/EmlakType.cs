using System.ComponentModel.DataAnnotations.Schema;

namespace EmlakOtomaston.Entity
{
    public class EmlakType
    {
        [ForeignKey("Emlak")]
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
