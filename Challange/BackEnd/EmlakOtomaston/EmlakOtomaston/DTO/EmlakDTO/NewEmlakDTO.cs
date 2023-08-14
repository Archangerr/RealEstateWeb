using EmlakOtomaston.Entity;


namespace EmlakOtomaston.DTO.EmlakDTO
{
    public class NewEmlakDTO : EditEmlakDTO
    {


        public NewEmlakDTO()
        {
        }
       // public new Emlak ToEmlak()
        public  Emlak ToEmlak()
        {
            return new Emlak()
            {
                Id = 0,
                isAvailable = true,
                Title = this.Title,
                TypeId = this.TypeId,
                DurumuId = this.DurumuId,
                DovizId = this.DovizId,
                Fiyat = this.Fiyat,
                IlanTarihi = this.IlanTarihi,
                IlanBitis = this.IlanBitis,
                ImageBase = this.ImageBase


            };

        }

    }
}
