using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinessStreamline.Data
{
    [MetadataType(typeof(NachfrageMetaData))]
    public partial class Nachfrage
    {
    }

    public class NachfrageMetaData
    {
        [Required]
        public int TeilId { get; set; }

        [Min(1)]
        public int Anzahl { get; set; }

        [Date()]
        [Required()]
        public DateTime ErstelltAm { get; set; }

        [Date()]
        [Required()]
        public DateTime Liefertermin { get; set; }
    }
}