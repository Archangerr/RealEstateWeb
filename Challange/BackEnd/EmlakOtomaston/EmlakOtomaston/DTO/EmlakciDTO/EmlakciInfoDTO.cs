using EmlakOtomaston.Entity;

namespace EmlakOtomaston.DTO.EmlakciDTO
{
    public class EmlakciInfoDTO : EditEmlakciDTO
    {
        public EmlakciInfoDTO(Emlakci emlakci)
        {
            Id = emlakci.Id;
            Name = emlakci.Name;
            Email = emlakci.Email;
        }
    }
}
