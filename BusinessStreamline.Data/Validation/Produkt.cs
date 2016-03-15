using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinessStreamline.Data
{
    [MetadataType(typeof(ProduktMetaData))]
    public partial class Produkt
    {
    }

    public class ProduktMetaData
    {
        [Required]
        public int FirmaId { get; set; }

        [StringLength(40, MinimumLength = 3)]
        public string Name { get; set; }
    }
}