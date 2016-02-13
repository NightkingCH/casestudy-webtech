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
    public class ProduktController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Produkt
        public IQueryable<Produkt> GetProdukt()
        {
            return db.Produkt;
        }

        // GET: api/Produkt/5
        [ResponseType(typeof(Produkt))]
        public IHttpActionResult GetProdukt(int id)
        {
            Produkt produkt = db.Produkt.Find(id);
            if (produkt == null)
            {
                return NotFound();
            }

            return Ok(produkt);
        }

        // PUT: api/Produkt/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProdukt(int id, Produkt produkt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != produkt.ProduktId)
            {
                return BadRequest();
            }

            db.Entry(produkt).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProduktExists(id))
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

        // POST: api/Produkt
        [ResponseType(typeof(Produkt))]
        public IHttpActionResult PostProdukt(Produkt produkt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Produkt.Add(produkt);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ProduktExists(produkt.ProduktId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = produkt.ProduktId }, produkt);
        }

        // DELETE: api/Produkt/5
        [ResponseType(typeof(Produkt))]
        public IHttpActionResult DeleteProdukt(int id)
        {
            Produkt produkt = db.Produkt.Find(id);
            if (produkt == null)
            {
                return NotFound();
            }

            db.Produkt.Remove(produkt);
            db.SaveChanges();

            return Ok(produkt);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProduktExists(int id)
        {
            return db.Produkt.Count(e => e.ProduktId == id) > 0;
        }
    }
}