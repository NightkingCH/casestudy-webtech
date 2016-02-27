using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using BusinessStreamline.Data;

namespace BusinessStreamline.Controllers.WebAPI
{
    [RoutePrefix("api/teil")]
    public class TeilController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Teil
        public IQueryable<Teil> GetTeil()
        {
            return db.Teil;
        }

        // GET: api/teil/produkt/1
        [HttpGet()]
        [Route("produkt/{produkt:int}")]
        [ResponseType(typeof(IQueryable<ViewTeil>))]
        public IQueryable<ViewTeil> GetTeilByProdukt(int produkt)
        {
            return db.ViewTeil
                .Where(x => x.ProduktId == produkt);
        }

        // GET: api/teil/5
        [ResponseType(typeof(ViewTeil))]
        public IHttpActionResult GetTeil(int id)
        {
            ViewTeil teil = db.ViewTeil
                .FirstOrDefault(x => x.TeilId == id);

            if (teil == null)
            {
                return NotFound();
            }

            return Ok(teil);
        }

        // PUT: api/Teil/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTeil(int id, Teil teil)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != teil.TeilId)
            {
                return BadRequest();
            }

            db.Entry(teil).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeilExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Teil
        [ResponseType(typeof(Teil))]
        public IHttpActionResult PostTeil(Teil teil)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Teil.Add(teil);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = teil.TeilId }, teil);
        }

        // DELETE: api/Teil/5
        [ResponseType(typeof(Teil))]
        public IHttpActionResult DeleteTeil(int id)
        {
            Teil teil = db.Teil.Find(id);
            if (teil == null)
            {
                return NotFound();
            }

            db.Teil.Remove(teil);
            db.SaveChanges();

            return Ok(teil);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TeilExists(int id)
        {
            return db.Teil.Count(e => e.TeilId == id) > 0;
        }
    }
}