using EmlakOtomaston.Entity;

using bdto = EmlakOtomaston.DTO.BaseDTO;

namespace EmlakOtomaston.DTO.EmlakDTO
{
    public class EditEmlakDTO : bdto.BaseDTO
    {
        public string Title { get; set; }
        public int TypeId { get; set; }
        public int DurumuId { get; set; }
        public int DovizId { get; set; }
        public int Fiyat { get; set; }
        public DateTime IlanTarihi { get; set; }
        public DateTime IlanBitis { get; set; }
        public int EmlakciId { get; set; }
        public List<string> ImageBases { get; set; }
        public double Latitude { get; set; } 
        public double Longitude { get; set; } 
        public bool isAvailable { get; set; }



        public EditEmlakDTO()
        {
        }
        public Emlak ToEmlak()
        {
            var emlak = new Emlak()
            {
                Id = 0,
                Title = this.Title,
                TypeId = this.TypeId,
                DurumuId = this.DurumuId,
                DovizId = this.DovizId,
                Fiyat = this.Fiyat,
                IlanTarihi = this.IlanTarihi,
                IlanBitis = this.IlanBitis,
                EmlakciId = this.EmlakciId,
                Latitude = this.Latitude,
                Longitude = this.Longitude,
                isAvailable = this.isAvailable
            };
            emlak.Images = new List<Image>();

            foreach (var imageBase in this.ImageBases)
            {
                emlak.Images.Add(new Image
                {
                    ImageBase = imageBase,
                    // Set EmlakId if needed
                });
            }

            return emlak;
        }

    }
}
