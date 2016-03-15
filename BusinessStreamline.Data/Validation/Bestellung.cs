using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinessStreamline.Data
{
    [MetadataType(typeof(BestellungMetaData))]
    public partial class Bestellung
    {
    }

    public class BestellungMetaData
    {
        [Required]
        public int NachfrageId { get; set; }

        [Required]
        public int AngebotId { get; set; }

        [Date()]
        [Required()]
        public DateTime ErstelltAm { get; set; }
    }
}