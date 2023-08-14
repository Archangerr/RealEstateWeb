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
        public string ImageBase { get; set; }
        public int EmlakciId { get; set; }


        public EditEmlakDTO()
        {
        }
        public Emlak ToEmlak()
        {
            return new Emlak()
            {
                Id = 0,
                Title = this.Title,
                TypeId = this.TypeId,
                DurumuId = this.DurumuId,
                DovizId = this.DovizId,
                Fiyat = this.Fiyat,
                IlanTarihi = this.IlanTarihi,
                IlanBitis = this.IlanBitis,
                ImageBase = this.ImageBase,
                EmlakciId = this.EmlakciId

            };

        }

    }
}
