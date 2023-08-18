using EmlakOtomaston.Entity;

using bdto = EmlakOtomaston.DTO.BaseDTO;
namespace EmlakOtomaston.DTO.EmlakDTO
{
    public class EmlakDetailsDTO : EditEmlakDTO
    {
        //public string Title { get; set; }
        //public EmlakType Type { get; set; }
        //public EmlakDurumu Durumu { get; set; }
        //public string Doviz { get; set; }
        //public int Fiyat { get; set; }
        //public DateTime IlanTarihi { get; set; }
        //public DateTime IlanBitis { get; set; }
        //public string ImageBase { get; set; }
        public string Doviz { get; set; }
        public string Durumu { get; set; }
        public string Type { get; set; }
        public EmlakDetailsDTO(Emlak emlak)
        {
            Id= emlak.Id; 
            Title = emlak.Title;
            Doviz = emlak.Doviz.Name;
            Durumu = emlak.Durumu.Name;
            Type = emlak.Type.Name;
            Fiyat = emlak.Fiyat;
            IlanTarihi = emlak.IlanTarihi;
            IlanBitis = emlak.IlanBitis;
            EmlakciId = emlak.EmlakciId;
            Longitude = emlak.Longitude;
            Latitude = emlak.Latitude;
            ImageBases = new List<string>();

            if (emlak.Images != null)
            {
                foreach (var image in emlak.Images)
                {
                    ImageBases.Add(image.ImageBase);
                }
            }
        }
    }
}
