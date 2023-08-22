using EmlakOtomaston.DTO.EmlakDTO;
using EmlakOtomaston.Entity;
using EmlakOtomaston.Migrations;

namespace EmlakOtomaston.DTO.EmlakciDTO
{
    public class EmlakciInfoDTO : EditEmlakciDTO
    {
        public List<EmlakDetailsDTO> EmlakDetails { get; set; }
        public EmlakciInfoDTO(Emlakci emlakci)
        {
            Id = emlakci.Id;
            Name = emlakci.Name;
            Email = emlakci.Email;

            // If there are associated Emlaks, map each to a DTO
            if (emlakci.Emlaklar != null && emlakci.Emlaklar.Any())
            {
                EmlakDetails = new List<EmlakDetailsDTO>();
                foreach (var emlak in emlakci.Emlaklar)
                {
                    EmlakDetails.Add(new EmlakDetailsDTO(emlak));
                }
            }
        }
    }
}
