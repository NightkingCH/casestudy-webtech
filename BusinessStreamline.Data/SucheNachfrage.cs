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
    
    public partial class SucheNachfrage
    {
        public int NachfrageId { get; set; }
        public int Anzahl { get; set; }
        public System.DateTime ErstelltAm { get; set; }
        public int TeilId { get; set; }
        public string TeilName { get; set; }
        public int TypId { get; set; }
        public string TypName { get; set; }
        public int ProduktId { get; set; }
        public string ProduktName { get; set; }
    }
}