using System.ComponentModel.DataAnnotations;

namespace EmlakOtomaston.DTO.AuthDTO
{
    public class LoginRequestDto
    {
        public string? Username { get; set; }

        public string? Password { get; set; }
    }
}
