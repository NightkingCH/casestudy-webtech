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
    public class TypController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Typ
        public IQueryable<Typ> GetTyp()
        {
            return db.Typ;
        }

        // GET: api/Typ/5
        [ResponseType(typeof(Typ))]
        public IHttpActionResult GetTyp(int id)
        {
            Typ typ = db.Typ.Find(id);
            if (typ == null)
            {
                return NotFound();
            }

            return Ok(typ);
        }

        // PUT: api/Typ/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTyp(int id, Typ typ)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != typ.TypId)
            {
                return BadRequest();
            }

            db.Entry(typ).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TypExists(id))
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

        // POST: api/Typ
        [ResponseType(typeof(Typ))]
        public IHttpActionResult PostTyp(Typ typ)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Typ.Add(typ);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = typ.TypId }, typ);
        }

        // DELETE: api/Typ/5
        [ResponseType(typeof(Typ))]
        public IHttpActionResult DeleteTyp(int id)
        {
            Typ typ = db.Typ.Find(id);
            if (typ == null)
            {
                return NotFound();
            }

            db.Typ.Remove(typ);
            db.SaveChanges();

            return Ok(typ);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TypExists(int id)
        {
            return db.Typ.Count(e => e.TypId == id) > 0;
        }
    }
}