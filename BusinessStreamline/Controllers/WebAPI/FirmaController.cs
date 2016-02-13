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
    public class FirmaController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Firma
        public IQueryable<Firma> GetFirma()
        {
            return db.Firma;
        }

        // GET: api/Firma/5
        [ResponseType(typeof(Firma))]
        public IHttpActionResult GetFirma(int id)
        {
            Firma firma = db.Firma.Find(id);
            if (firma == null)
            {
                return NotFound();
            }

            return Ok(firma);
        }

        // PUT: api/Firma/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFirma(int id, Firma firma)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != firma.FirmaId)
            {
                return BadRequest();
            }

            db.Entry(firma).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FirmaExists(id))
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

        // POST: api/Firma
        [ResponseType(typeof(Firma))]
        public IHttpActionResult PostFirma(Firma firma)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Firma.Add(firma);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = firma.FirmaId }, firma);
        }

        // DELETE: api/Firma/5
        [ResponseType(typeof(Firma))]
        public IHttpActionResult DeleteFirma(int id)
        {
            Firma firma = db.Firma.Find(id);
            if (firma == null)
            {
                return NotFound();
            }

            db.Firma.Remove(firma);
            db.SaveChanges();

            return Ok(firma);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FirmaExists(int id)
        {
            return db.Firma.Count(e => e.FirmaId == id) > 0;
        }
    }
}