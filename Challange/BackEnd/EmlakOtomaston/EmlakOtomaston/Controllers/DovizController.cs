using EmlakOtomaston.Auth;
using EmlakOtomaston.DatabaseContext;
using EmlakOtomaston.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace EmlakOtomaston.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DovizController : ControllerBase
    {
        private readonly EmlakContext _emlakContext;

        public DovizController(EmlakContext emlakContext)
        {
            _emlakContext = emlakContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()  // This method gets all even if its not available
        {
            var result = await _emlakContext.Dovizler.ToListAsync();

            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Doviz request)
        {
            var item = _emlakContext.Dovizler.Add(request);
            await _emlakContext.SaveChangesAsync();
            var newEntity = _emlakContext.Dovizler.
                Single(x => x.Id == item.Entity.Id);

            return Ok(newEntity);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPut]
        public async Task<IActionResult> Put(Doviz request)
        {
            var item = await _emlakContext.Dovizler.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                item.Name = request.Name;
                var result = await _emlakContext.SaveChangesAsync();
                return Ok(item);
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _emlakContext.Dovizler.SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                _emlakContext.Dovizler.Remove(item);
                await _emlakContext.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}
