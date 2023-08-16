using EmlakOtomaston.Entity;
using EmlakOtomaston.Migrations;


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
            
            var emlak= new Emlak()
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
                EmlakciId = this.EmlakciId,
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
