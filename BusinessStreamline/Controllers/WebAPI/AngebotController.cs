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
    public class AngebotController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Angebot
        public IQueryable<Angebot> GetAngebot()
        {
            return db.Angebot;
        }

        // GET: api/Angebot/5
        [ResponseType(typeof(Angebot))]
        public IHttpActionResult GetAngebot(int id)
        {
            Angebot angebot = db.Angebot.Find(id);
            if (angebot == null)
            {
                return NotFound();
            }

            return Ok(angebot);
        }

        // PUT: api/Angebot/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAngebot(int id, Angebot angebot)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != angebot.AngebotId)
            {
                return BadRequest();
            }

            db.Entry(angebot).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AngebotExists(id))
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

        // POST: api/Angebot
        [ResponseType(typeof(Angebot))]
        public IHttpActionResult PostAngebot(Angebot angebot)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Angebot.Add(angebot);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = angebot.AngebotId }, angebot);
        }

        // DELETE: api/Angebot/5
        [ResponseType(typeof(Angebot))]
        public IHttpActionResult DeleteAngebot(int id)
        {
            Angebot angebot = db.Angebot.Find(id);
            if (angebot == null)
            {
                return NotFound();
            }

            db.Angebot.Remove(angebot);
            db.SaveChanges();

            return Ok(angebot);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AngebotExists(int id)
        {
            return db.Angebot.Count(e => e.AngebotId == id) > 0;
        }
    }
}