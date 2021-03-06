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