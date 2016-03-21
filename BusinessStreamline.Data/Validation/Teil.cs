using DataAnnotationsExtensions;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BusinessStreamline.Data
{
    [MetadataType(typeof(TeilMetaData))]
    public partial class Teil
    {
    }

    public class TeilMetaData
    {
        [Required]
        public int ProduktId { get; set; }

        [Required]
        public int TypId { get; set; }

        [Required]
        public int QualitaetId { get; set; }

        [StringLength(40, MinimumLength = 3)]
        public string Name { get; set; }

        [Min(1)]
        public int Anzahl { get; set; }
    }
}