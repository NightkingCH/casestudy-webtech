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
    public class LoginController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // POST: api/Login
        [ResponseType(typeof(Login))]
        public IHttpActionResult PostLogin(Login login)
        {
            // logon function => never expose any validation information about the provided login details!

            if (string.IsNullOrWhiteSpace(login.Name))
            {
                return BadRequest();
            }

            if (string.IsNullOrWhiteSpace(login.Password))
            {
                return BadRequest();
            }

            var entity = db.Login.FirstOrDefault(x => x.Name == login.Name);

            if (entity == null) {
                return BadRequest();
            }

            if (entity.Password != login.Password)
            {
                return BadRequest();
            }

            entity.Password = ""; // goes over the network => never send a password back!

            return Ok(entity);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LoginExists(int id)
        {
            return db.Login.Count(e => e.LoginId == id) > 0;
        }
    }
}