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

    public class Search
    {
        public string search { get; set; }
        public int typ { get; set; }
        public int page { get; set; }
        public int take { get; set; }

        public Search()
        {
            this.search = null;
            this.typ = 0;
            this.page = 0;
            this.take = 10;
        }
    }

    [RoutePrefix("api/search")]
    public class SucheNachfrageController : ApiController
    {
        private BusinessStreamlineEntities db = new BusinessStreamlineEntities();

        // GET: api/Produkt
        public IQueryable<Produkt> GetProdukt()
        {
            return db.Produkt;
        }

        // GET: api/search
        // Test: api/search/nachfrage/{"typ": 0, "search": "Schraube", "page": 0, "take": 10}
        // REMARK: http://stackoverflow.com/questions/6025522/getting-a-potentially-dangerous-request-path-value-was-detected-from-the-client
        [HttpGet()]
        [Route("nachfrage/{src}")]
        [ResponseType(typeof(IQueryable<Nachfrage>))]
        public IQueryable<Nachfrage> SearchNachfrage(string src)
        {
            var search = new Search();

            if (!string.IsNullOrWhiteSpace(src))
            {
                search = Newtonsoft.Json.JsonConvert.DeserializeObject<Search>(src);
            }

            // min 10 records.
            // avoid -1 and 0 over api call.
            if (search.take <= 9)
            {
                search.take = 10;
            }

            // avoid -1 over api call.
            if (search.page < 0)
            {
                search.page = 0;
            }

            IQueryable<Nachfrage> query = db.Nachfrage;

            // search through all parts
            if (!string.IsNullOrWhiteSpace(search.search))
            {
                query = query.Where(x => x.Teil.Name.Contains(search.search));
            }

            // add a type constraint
            if (search.typ != 0)
            {
                query = query.Where(x => x.Teil.Typ.TypId == search.typ);
            }

            // apply default sort => otherwise we can't add skip or take (paging)
            query = query.OrderBy(x => x.Teil.Name);

            return query.Skip(search.page * search.take).Take(10);
        }
    }
}