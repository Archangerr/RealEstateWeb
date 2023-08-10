
using Microsoft.EntityFrameworkCore;
using EmlakOtomaston.Entity;

namespace EmlakOtomaston.DatabaseContext
{
    public class EmlakContext : DbContext
    {
        public DbSet<Emlak> Emlaklar { get; set; }
        public DbSet<Emlakci> Emlakcilar { get; set; }
        public DbSet<EmlakType> EmlakType { get; set; }    
        public DbSet<EmlakDurumu> EmlakDurumlari { get; set; }
        public DbSet<Doviz> Dovizler { get; set; }

        public EmlakContext(DbContextOptions<EmlakContext> opt) : base(opt)
        {
        }
    }
}
