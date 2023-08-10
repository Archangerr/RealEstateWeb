
namespace EmlakOtomaston.Entity
{
    public class Emlak : BaseEntity
    {
        public string Title { get; set; }
        public int TypeId { get; set; }
        public virtual EmlakType Type { get; set; } 
        public int DovizId { get; set; }
        public virtual Doviz Doviz { get; set; }
        public int Fiyat { get; set; }
        public int DurumuId { get; set; }
        public virtual EmlakDurumu Durumu { get; set; }
        
        public DateTime IlanTarihi { get; set; }
        public DateTime IlanBitis { get; set; }
        public string ImageBase { get; set; }
        public bool isAvailable { get; set; }
    }
}
