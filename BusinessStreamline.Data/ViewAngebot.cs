//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace BusinessStreamline.Data
{
    using System;
    using System.Collections.Generic;
    
    public partial class ViewAngebot
    {
        public int AngebotId { get; set; }
        public System.DateTime ErstelltAm { get; set; }
        public decimal PreisProTeil { get; set; }
        public int Status { get; set; }
        public string Name { get; set; }
        public int NachfrageId { get; set; }
    }
}
