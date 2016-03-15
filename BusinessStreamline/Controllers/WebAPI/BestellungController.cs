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
using System.Web;
using System.Xml.Linq;
using System.IO;
using System.Net.Http.Headers;

namespace BusinessStreamline.Controllers.WebAPI
{
    [RoutePrefix("api/bestellung")]
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

        // GET: api/bestellung/overview/firma/1
        [HttpGet()]
        [Route("overview/firma/{firma:int}")]
        [ResponseType(typeof(IQueryable<ViewBestellung>))]
        public IQueryable<ViewBestellung> GetOverviewByFirma(int firma)
        {
            return db.ViewBestellung
                .Where(x => x.FirmaId == firma);
        }

        // GET: api/bestellung/overview/anbieter/1
        [HttpGet()]
        [Route("overview/anbieter/{anbieter:int}")]
        [ResponseType(typeof(IQueryable<ViewBestellung>))]
        public IQueryable<ViewBestellung> GetOverviewByAnbieter(int anbieter)
        {
            return db.ViewBestellung
                .Where(x => x.AnbieterId == anbieter);
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

        // POST: api/Bestellung/5
        [ResponseType(typeof(Bestellung))]
        public IHttpActionResult PostBestellung(int id, Bestellung bestellung)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var relatedRequest = db.Nachfrage.FirstOrDefault(x => x.Teil.Produkt.FirmaId == id && x.NachfrageId == bestellung.NachfrageId);

            if (relatedRequest == null)
            {
                return BadRequest("The provided company doesn't own this request!");
            }

            db.Bestellung.Add(bestellung);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bestellung.BestellungId }, bestellung);
        }

        // GET: api/Bestellung/xml/create/1001/1001
        [HttpGet()]
        [Route("xml/create/{firmaId:int}/{bestellungId:int}")]
        [ResponseType(typeof(Bestellung))]
        public IHttpActionResult CreateXmlBestellung(int firmaId, int bestellungId)
        {
            Bestellung bestellung = db.Bestellung.FirstOrDefault(x => x.BestellungId == bestellungId && x.Nachfrage.Teil.Produkt.FirmaId == firmaId);

            if (bestellung == null)
            {
                return NotFound();
            }

            try
            {
                this.createXml(bestellung);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
            
            return Ok();
        }

        private void createXml(Bestellung bestellung) {

            ViewBestellung vBestellung = db.ViewBestellung.FirstOrDefault(x => x.BestellungId == bestellung.BestellungId);

            string fullSavePath = HttpContext.Current.Server.MapPath(string.Format(@"~/App_Data/Bestellungen/{0}.xml", bestellung.BestellungId.ToString()));

            // http://www.dotnet-tricks.com/Tutorial/linq/bTa2310512-Create-xml-from-database-using-LINQ.html
            XElement orderXml = new XElement("Bestellung", new List<ViewBestellung>() { vBestellung }.Select(
                x => new XElement("Details",
                                    new XAttribute("BestellungId", x.BestellungId),
                                    new XAttribute("AngebotId", x.AngebotId),
                                    new XAttribute("ProduktId", x.ProduktId),
                                    new XAttribute("ProduktName", x.ProduktName),
                                    new XAttribute("TeilName", x.TeilName),
                                    new XAttribute("FirmaName", x.FirmaName),
                                    new XAttribute("AnbieterName", x.AnbieterName),
                                    new XAttribute("PreisProTeil", x.PreisProTeil),
                                    new XAttribute("BestellDatum", x.BestellDatum)
            )));

            orderXml.Save(fullSavePath);
        }

        // GET api/bestellung/xml/get/1001/1001
        [HttpGet()]
        [Route("xml/get/{firmaId:int}/{bestellungId:int}")]
        [ResponseType(typeof(IHttpActionResult))]
        public IHttpActionResult GetXmlBestellung(int firmaId, int bestellungId)
        {
            Bestellung bestellung = db.Bestellung.FirstOrDefault(x => x.BestellungId == bestellungId && x.Nachfrage.Teil.Produkt.FirmaId == firmaId);

            if (bestellung == null)
            {
                return NotFound();
            }

            try
            {

                var xmlPath = HttpContext.Current.Server.MapPath(string.Format(@"~/App_Data/Bestellungen/{0}.xml", bestellung.BestellungId.ToString()));
                var xmlInfo = new FileInfo(xmlPath);

                if (!xmlInfo.Exists) {
                    this.createXml(bestellung);
                }

                var xmlResponse = Request.CreateResponse(HttpStatusCode.OK);

                xmlResponse.Content = new StreamContent(new FileStream(xmlPath, FileMode.Open, FileAccess.Read));
                xmlResponse.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment");
                xmlResponse.Content.Headers.ContentDisposition.FileName = string.Format(@"{0}.xml", bestellung.BestellungId.ToString());
                xmlResponse.Content.Headers.ContentType = new MediaTypeHeaderValue("text/xml");

                return ResponseMessage(xmlResponse);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
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