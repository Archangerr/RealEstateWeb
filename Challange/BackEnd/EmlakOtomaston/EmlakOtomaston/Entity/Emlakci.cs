namespace EmlakOtomaston.Entity
{
    public class Emlakci : BaseEntity
    {
        public string Name { get; set; }
        public string Email { get; set; }

        public ICollection<Emlak> Emlaklar { get; set; }
    }
}
