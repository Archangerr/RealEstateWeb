﻿using EmlakOtomaston.Auth;
using EmlakOtomaston.DatabaseContext;
using EmlakOtomaston.DTO.EmlakDTO;
using EmlakOtomaston.Entity;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace EmlakOtomaston.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EmlakController : ControllerBase
    {
        private readonly EmlakContext _emlakContext;

        public EmlakController(EmlakContext emlakContext)
        {
            _emlakContext = emlakContext;
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("list")]
        public async Task<IActionResult> GetAll()  // This method gets all even if its not available
        {
            var result = await _emlakContext.Emlaklar.
                Include(emlak => emlak.Doviz).
                Include(emlak => emlak.Durumu).
                Include(emlak => emlak.Type).
                ToListAsync();

            if (result == null)
                return NotFound();

            var emlakDetailsList = new List<EmlakDetailsDTO>();
            result.ForEach(emlak => emlakDetailsList.Add(new EmlakDetailsDTO(emlak)));
            return Ok(emlakDetailsList);
        }
        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("Pagination")]
        public async Task<IActionResult> GetAllPagination(int pageIndex = 0, int pageSize = 10)
        {
            // Count the total number of records for pagination metadata
            int totalCount = await _emlakContext.Emlaklar.CountAsync();

            // If there's no data, return NotFound
            if (totalCount == 0)
                return NotFound();

            // Retrieve the subset of records based on the current page and page size
            var result = await _emlakContext.Emlaklar
                        .Include(emlak => emlak.Doviz)
                        .Include(emlak => emlak.Durumu)
                        .Include(emlak => emlak.Type)
                        .OrderBy(emlak => emlak.Id) // Ensure consistent order; replace `Id` with your primary key
                        .Skip(pageIndex * pageSize)
                        .Take(pageSize)
                        .ToListAsync();

            var emlakDetailsList = result.Select(emlak => new EmlakDetailsDTO(emlak)).ToList();

            // (Optional) Return pagination metadata 
            var response = new
            {
                PageIndex = pageIndex,
                PageSize = pageSize,
                TotalCount = totalCount,
                TotalPages = (int)Math.Ceiling(totalCount / (double)pageSize),
                Items = emlakDetailsList
            };

            return Ok(response);
        }

        //[Authorize(Roles = UserRoles.User)]
        [AllowAnonymous]
        [HttpGet]
        [Route("Filtered")]
        public IActionResult GetFilteredEmlaks([FromQuery] EmlakSearchModel searchModel)
        {
            var result = FilterEmlaks(searchModel);
            return Ok(result);
        }

        private IQueryable<EmlakDetailsDTO> FilterEmlaks(EmlakSearchModel searchModel)
        {
            
            IQueryable<Emlak> query = _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type);

            if (!string.IsNullOrWhiteSpace(searchModel.Title))
            {
                query = query.Where(p => p.Title.Contains(searchModel.Title));
            }

            if (searchModel.MinPrice.HasValue)
            {
                query = query.Where(p => p.Fiyat >= searchModel.MinPrice.Value);
            }

            if (searchModel.MaxPrice.HasValue)
            {
                query = query.Where(p => p.Fiyat <= searchModel.MaxPrice.Value);
            }

            if (searchModel.TypeId.HasValue)
            {
                query = query.Where(p => p.TypeId == searchModel.TypeId.Value);
            }

            if (searchModel.DurumuId.HasValue)
            {
                query = query.Where(p => p.DurumuId == searchModel.DurumuId.Value);
            }

            if (searchModel.DovizId.HasValue)
            {
                query = query.Where(p => p.DovizId == searchModel.DovizId.Value);
            }
            //var emlakDetailsList = new List<EmlakDetailsDTO>();
            //emlakDetailsList = query.Select(emlak => new EmlakDetailsDTO(emlak)) ;

            //return emlakDetailsList;

            //emlaklar = query.ToList();
            //return query;
            return query.Select(emlak => new EmlakDetailsDTO(emlak));
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("byId")]
        public async Task<IActionResult> GetEmlakById(int id)
        {
            var result = await _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .Where(x => x.Id == id  && x.isAvailable).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            var emlakDetailsList = new List<EmlakDetailsDTO>();
            result.ForEach(book => emlakDetailsList.Add(new EmlakDetailsDTO(book)));
            return Ok(emlakDetailsList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("byTitle")]
        public async Task<IActionResult> GetEmlakByTitle(string title)
        {
            var result = await _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .Where(x => x.Title.Contains(title) && x.isAvailable).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            var emlakDetailsList = new List<EmlakDetailsDTO>();
            result.ForEach(book => emlakDetailsList.Add(new EmlakDetailsDTO(book)));
            return Ok(emlakDetailsList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("byType")]
        public async Task<IActionResult> GetEmlakByType(EmlakType type)
        {
            var result = await _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .Where(x => x.Type == type && x.isAvailable).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            var emlakDetailsList = new List<EmlakDetailsDTO>();
            result.ForEach(book => emlakDetailsList.Add(new EmlakDetailsDTO(book)));
            return Ok(emlakDetailsList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("byDurumu")]
        public async Task<IActionResult> GetEmlakByDurumu(EmlakDurumu durumu)
        {
            var result = await _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .Where(x => x.Durumu == durumu && x.isAvailable).ToListAsync();

            if (result == null)
            {
                return NotFound();
            }

            var emlakDetailsList = new List<EmlakDetailsDTO>();
            result.ForEach(book => emlakDetailsList.Add(new EmlakDetailsDTO(book)));
            return Ok(emlakDetailsList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpGet]
        [Route("byTarih")]
        public async Task<IActionResult> GetEmlakByTarih([FromQuery] DateTime BaslangicTarihi, [FromQuery] DateTime BitisTarihi)
        {

            var result = await _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .Where(r => r.IlanTarihi >= BaslangicTarihi && r.IlanTarihi <= BitisTarihi && r.isAvailable).ToListAsync();

            var emlakDetailsList = new List<EmlakDetailsDTO>();
            result.ForEach(book => emlakDetailsList.Add(new EmlakDetailsDTO(book)));
            return Ok(emlakDetailsList);
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] NewEmlakDTO request)
        {
            var item = _emlakContext.Emlaklar.Add(request.ToEmlak());
            await _emlakContext.SaveChangesAsync();
            var newEntity = _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .Single(x => x.Id == item.Entity.Id && x.isAvailable);

            return Ok(new EmlakDetailsDTO(newEntity));
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] EditEmlakDTO request)
        {
            var item = await _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .SingleOrDefaultAsync(x => x.Id == request.Id);
            if (item != null)
            {
                item.Title = request.Title;
                item.TypeId = request.TypeId;
                item.DurumuId = request.DurumuId;
                item.DovizId = request.DovizId;
                item.Fiyat = request.Fiyat;
                item.IlanTarihi = request.IlanTarihi;
                item.IlanBitis = request.IlanBitis;
                item.ImageBase = request.ImageBase;
                var result = await _emlakContext.SaveChangesAsync();
                return Ok(new EmlakDetailsDTO(item));
            }
            return NotFound();
        }

        [Authorize(Roles = UserRoles.User)]
        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await _emlakContext.Emlaklar
                .Include(emlak => emlak.Doviz)
                .Include(emlak => emlak.Durumu)
                .Include(emlak => emlak.Type)
                .SingleOrDefaultAsync(x => x.Id == id);
            if (item != null)
            {
                item.isAvailable = false;
                await _emlakContext.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();
        }


    }
}
