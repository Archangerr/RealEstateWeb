using EmlakOtomaston.Auth;
using EmlakOtomaston.DatabaseContext;
using EmlakOtomaston.DTO.EmlakciDTO;
using EmlakOtomaston.DTO.EmlakDTO;
using EmlakOtomaston.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmlakOtomaston.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmlakciController : ControllerBase
    {
        private readonly EmlakContext _emlakContext;

        public EmlakciController(EmlakContext emlakContext)
        {
            _emlakContext = emlakContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _emlakContext.Emlakcilar.ToListAsync();

            if (result == null)
                return NotFound();

            var emlakciDetail = new List<EmlakciInfoDTO>();
            result.ForEach(Emlakci => emlakciDetail.Add(new EmlakciInfoDTO(Emlakci)));

            return Ok(emlakciDetail);
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpGet]
        public async Task<IActionResult> GetById(int id)
        {
            var result = await _emlakContext.Emlakcilar.Include(emlakci => emlakci.Emlaklar).SingleOrDefaultAsync(x => x.Id == id);

            if (result != null)
                return Ok(new EmlakciInfoDTO(result));

            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewEmlakciDTO request)
        {
            var item = _emlakContext.Emlakcilar.Add(request.ToEmlakci());
            await _emlakContext.SaveChangesAsync();

            return Ok(new EmlakciInfoDTO(item.Entity));
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditEmlakciDTO request)
        {
            var item = await _emlakContext.Emlakcilar.SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                item.Name = request.Name;
                var result = await _emlakContext.SaveChangesAsync();
                return Ok(item);
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.Admin)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _emlakContext.Emlakcilar.SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                _emlakContext.Remove(item);
                await _emlakContext.SaveChangesAsync();
                return NoContent();
            }

            return NotFound();
        }

    }
}
