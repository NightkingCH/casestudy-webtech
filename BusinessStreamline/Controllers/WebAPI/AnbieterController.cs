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
    public class AnbieterController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Anbieter
        public IQueryable<Anbieter> GetAnbieter()
        {
            return db.Anbieter;
        }

        // GET: api/Anbieter/5
        [ResponseType(typeof(Anbieter))]
        public IHttpActionResult GetAnbieter(int id)
        {
            Anbieter anbieter = db.Anbieter.Find(id);
            if (anbieter == null)
            {
                return NotFound();
            }

            return Ok(anbieter);
        }

        // PUT: api/Anbieter/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAnbieter(int id, Anbieter anbieter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != anbieter.AnbieterId)
            {
                return BadRequest();
            }

            db.Entry(anbieter).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnbieterExists(id))
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

        // POST: api/Anbieter
        [ResponseType(typeof(Anbieter))]
        public IHttpActionResult PostAnbieter(Anbieter anbieter)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Anbieter.Add(anbieter);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = anbieter.AnbieterId }, anbieter);
        }

        // DELETE: api/Anbieter/5
        [ResponseType(typeof(Anbieter))]
        public IHttpActionResult DeleteAnbieter(int id)
        {
            Anbieter anbieter = db.Anbieter.Find(id);
            if (anbieter == null)
            {
                return NotFound();
            }

            db.Anbieter.Remove(anbieter);
            db.SaveChanges();

            return Ok(anbieter);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AnbieterExists(int id)
        {
            return db.Anbieter.Count(e => e.AnbieterId == id) > 0;
        }
    }
}