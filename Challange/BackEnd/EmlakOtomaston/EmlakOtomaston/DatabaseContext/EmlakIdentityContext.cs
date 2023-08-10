using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace EmlakOtomaston.DatabaseContext
{
    public class EmlakIdentityContext : IdentityDbContext<IdentityUser>
    {
        public EmlakIdentityContext(DbContextOptions<EmlakIdentityContext> options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
