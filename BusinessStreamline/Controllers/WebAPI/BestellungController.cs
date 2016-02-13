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
    public class BestellungController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Bestellung
        public IQueryable<Bestellung> GetBestellung()
        {
            return db.Bestellung;
        }

        // GET: api/Bestellung/5
        [ResponseType(typeof(Bestellung))]
        public IHttpActionResult GetBestellung(int id)
        {
            Bestellung bestellung = db.Bestellung.Find(id);
            if (bestellung == null)
            {
                return NotFound();
            }

            return Ok(bestellung);
        }

        // PUT: api/Bestellung/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBestellung(int id, Bestellung bestellung)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != bestellung.BestellungId)
            {
                return BadRequest();
            }

            db.Entry(bestellung).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BestellungExists(id))
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

        // POST: api/Bestellung
        [ResponseType(typeof(Bestellung))]
        public IHttpActionResult PostBestellung(Bestellung bestellung)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Bestellung.Add(bestellung);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bestellung.BestellungId }, bestellung);
        }

        // DELETE: api/Bestellung/5
        [ResponseType(typeof(Bestellung))]
        public IHttpActionResult DeleteBestellung(int id)
        {
            Bestellung bestellung = db.Bestellung.Find(id);
            if (bestellung == null)
            {
                return NotFound();
            }

            db.Bestellung.Remove(bestellung);
            db.SaveChanges();

            return Ok(bestellung);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BestellungExists(int id)
        {
            return db.Bestellung.Count(e => e.BestellungId == id) > 0;
        }
    }
}