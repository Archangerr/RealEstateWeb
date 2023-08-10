using EmlakOtomaston.Auth;
using EmlakOtomaston.DatabaseContext;
using EmlakOtomaston.DTO.EmlakDTO;
using EmlakOtomaston.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmlakOtomaston.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmlakTypeController : ControllerBase
    {
        private readonly EmlakContext _emlakContext;

        public EmlakTypeController(EmlakContext emlakContext)
        {
            _emlakContext = emlakContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()  // This method gets all even if its not available
        {
            List<EmlakType> result = await _emlakContext.EmlakType.ToListAsync();

            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public async Task<IActionResult> Post(EmlakType request)
        {
            var item = _emlakContext.EmlakType.Add(request);
            await _emlakContext.SaveChangesAsync();
            var newEntity = _emlakContext.EmlakType.                
                Single(x => x.Id == item.Entity.Id);

            return Ok(newEntity);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EmlakType request)
        {
            var item = await _emlakContext.EmlakType.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                item.Name= request.Name;
                var result = await _emlakContext.SaveChangesAsync();
                return Ok(item);
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _emlakContext.EmlakType.SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                _emlakContext.EmlakType.Remove(item);
                await _emlakContext.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }
    }
}
