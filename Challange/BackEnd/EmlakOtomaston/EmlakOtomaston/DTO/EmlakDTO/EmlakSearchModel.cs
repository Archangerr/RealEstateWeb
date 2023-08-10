namespace EmlakOtomaston.DTO.EmlakDTO
{
    public class EmlakSearchModel
    {
        public string? Title { get; set; }
        public decimal? MinPrice { get; set; } 
        public decimal? MaxPrice { get; set; }
        public DateTime? DateTime { get; set; }
        public int? TypeId { get; set; }
        public int? DurumuId { get; set; }
        public int? DovizId { get; set; }

    }
}
