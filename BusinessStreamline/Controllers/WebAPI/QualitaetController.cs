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
    public class QualitaetController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/qualitaet
        public IQueryable<Qualitaet> GetQualitaet()
        {
            return db.Qualitaet;
        }

        // GET: api/qualitaet/5
        [ResponseType(typeof(Qualitaet))]
        public IHttpActionResult GetQualitaet(int id)
        {
            Qualitaet qualitaet = db.Qualitaet.Find(id);

            if (qualitaet == null)
            {
                return NotFound();
            }

            return Ok(qualitaet);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}