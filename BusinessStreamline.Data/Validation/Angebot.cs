using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinessStreamline.Data
{
    [MetadataType(typeof(AngebotMetaData))]
    public partial class Angebot
    {
    }

    public class AngebotMetaData
    {
        [Required]
        public int AnbieterId { get; set; }

        [Required]
        public int NachfrageId { get; set; }

        [Min(0.01)]
        public decimal PreisProTeil { get; set; }

        [Date()]
        [Required()]
        public DateTime ErstelltAm { get; set; }
    }
}