namespace EmlakOtomaston.Entity
{
    public class Image : BaseEntity
    {
        public string ImageBase { get; set; }
        public int EmlakId { get; set; }
        public virtual Emlak Emlak { get; set; }
    }
}
