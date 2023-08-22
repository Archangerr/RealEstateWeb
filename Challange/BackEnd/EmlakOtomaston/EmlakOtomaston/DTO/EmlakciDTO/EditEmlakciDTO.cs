using EmlakOtomaston.DTO.EmlakDTO;
using EmlakOtomaston.Entity;
using bdto = EmlakOtomaston.DTO.BaseDTO;
namespace EmlakOtomaston.DTO.EmlakciDTO
{
    public class EditEmlakciDTO : bdto.BaseDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public Emlakci ToEmlakci()
        {
            return new Emlakci
            {
                Id = this.Id,
                Name = this.Name,
                Email = this.Email,
            };
        }

    }
}
