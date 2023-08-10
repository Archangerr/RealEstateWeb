using EmlakOtomaston.Entity;

namespace EmlakOtomaston.DTO.EmlakciDTO
{
    public class NewEmlakciDTO
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public Emlakci ToEmlakci()
        {
            return new Emlakci
            {
                Id = 0,
                Name = this.Name,
                Email = this.Email,
            };
        }
    }
}
