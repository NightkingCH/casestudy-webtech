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
    [RoutePrefix("api/angebot")]
    public class AngebotController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Angebot
        public IQueryable<Angebot> GetAngebot()
        {
            return db.Angebot;
        }

        // GET: api/angebot/nachfrage/1
        [HttpGet()]
        [Route("nachfrage/{nachfrage:int}")]
        [ResponseType(typeof(IQueryable<ViewAngebot>))]
        public IQueryable<ViewAngebot> GetAngebotByNachfrage(int nachfrage)
        {
            return db.ViewAngebot
                .Where(x => x.NachfrageId == nachfrage);
        }

        // GET: api/angebot/anbieter/1
        [HttpGet()]
        [Route("anbieter/{anbieter:int}")]
        [ResponseType(typeof(IQueryable<ViewAngebotAnbieter>))]
        public IQueryable<ViewAngebotAnbieter> GetAngebotByAnbieter(int anbieter)
        {
            return db.ViewAngebotAnbieter
                .Where(x => x.AnbieterId == anbieter);
        }

        // POST: api/angebot/accept
        [HttpPost()]
        [Route("accept/{id:int}")]
        [ResponseType(typeof(ViewAngebot))]
        public IHttpActionResult PostAcceptAngebot(int id, ViewAngebot model)
        {
            var relatedRequest = db.Nachfrage.FirstOrDefault(x => x.Teil.Produkt.FirmaId == id && x.NachfrageId == model.NachfrageId);

            if (relatedRequest == null)
            {
                return BadRequest("The provided company and offer don't match!");
            }

            if (model.AngebotId <= 0) {
                return BadRequest();
            }

            var angebot = db.Angebot.FirstOrDefault(x => x.AngebotId == model.AngebotId);

            if (angebot == null) {
                return NotFound();
            }

            angebot.Status = 1; // 0 = Offen, 1 = Akzeptiert, 2 = Abgelehnt

            db.Entry(angebot).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict();
            }
            catch (Exception ex) {
                throw ex;
            }

            var viewAngebot = db.ViewAngebot.FirstOrDefault(x => x.AngebotId == model.AngebotId);

            return Ok(viewAngebot);
        }

        // POST: api/angebot/accept
        [HttpPost()]
        [Route("decline/{id:int}")]
        [ResponseType(typeof(ViewAngebot))]
        public IHttpActionResult PostDeclineAngebot(int id, ViewAngebot model)
        {
            var relatedRequest = db.Nachfrage.FirstOrDefault(x => x.Teil.Produkt.FirmaId == id && x.NachfrageId == model.NachfrageId);

            if (relatedRequest == null)
            {
                return BadRequest("The provided company and offer don't match!");
            }

            if (model.AngebotId <= 0)
            {
                return BadRequest();
            }

            var angebot = db.Angebot.FirstOrDefault(x => x.AngebotId == model.AngebotId);

            if (angebot == null)
            {
                return NotFound();
            }

            angebot.Status = 2; // 0 = Offen, 1 = Akzeptiert, 2 = Abgelehnt

            db.Entry(angebot).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                return Conflict();
            }
            catch (Exception ex)
            {
                throw ex;
            }

            var viewAngebot = db.ViewAngebot.FirstOrDefault(x => x.AngebotId == model.AngebotId);

            return Ok(viewAngebot);
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