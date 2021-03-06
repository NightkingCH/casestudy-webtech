﻿using System;
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
    [RoutePrefix("api/nachfrage")]
    public class NachfrageController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Nachfrage
        public IQueryable<Nachfrage> GetNachfrage()
        {
            return db.Nachfrage;
        }

        // GET: api/nachfrage/firma/1
        [HttpGet()]
        [Route("firma/{firma:int}/login/{login:int}")]
        [ResponseType(typeof(IQueryable<ViewNachfrage>))]
        public IQueryable<ViewNachfrage> GetNachfrageByFirma(int firma, int login)
        {
            return db.ViewNachfrage
                .Where(x => x.FirmaId == firma && x.LoginId == login);
        }

        // GET: api/Nachfrage/5
        [ResponseType(typeof(ViewNachfrage))]
        public IHttpActionResult GetNachfrage(int id)
        {
            ViewNachfrage nachfrage = db.ViewNachfrage
                .FirstOrDefault( x=> x.NachfrageId == id);

            if (nachfrage == null)
            {
                return NotFound();
            }

            return Ok(nachfrage);
        }

        // PUT: api/Nachfrage/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNachfrage(int id, Nachfrage nachfrage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nachfrage.NachfrageId)
            {
                return BadRequest();
            }

            db.Entry(nachfrage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NachfrageExists(id))
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

        // POST: api/Nachfrage/4
        [ResponseType(typeof(Nachfrage))]
        public IHttpActionResult PostNachfrage(int id, Nachfrage nachfrage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var relatedPart = db.Teil.FirstOrDefault(x => x.Produkt.FirmaId == id && x.TeilId == nachfrage.TeilId);

            if (relatedPart == null) {
                return BadRequest("The provided company doesn't own the part!");
            }

            db.Nachfrage.Add(nachfrage);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = nachfrage.NachfrageId }, nachfrage);
        }

        // DELETE: api/Nachfrage/5
        [ResponseType(typeof(Nachfrage))]
        public IHttpActionResult DeleteNachfrage(int id)
        {
            Nachfrage nachfrage = db.Nachfrage.Find(id);
            if (nachfrage == null)
            {
                return NotFound();
            }

            db.Nachfrage.Remove(nachfrage);
            db.SaveChanges();

            return Ok(nachfrage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NachfrageExists(int id)
        {
            return db.Nachfrage.Count(e => e.NachfrageId == id) > 0;
        }
    }
}