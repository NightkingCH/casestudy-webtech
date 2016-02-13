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
    
    public partial class Nachfrage
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Nachfrage()
        {
            this.Angebot = new HashSet<Angebot>();
            this.Bestellung = new HashSet<Bestellung>();
        }
    
        public int NachfrageId { get; set; }
        public Nullable<int> Anzahl { get; set; }
        public Nullable<System.DateTime> ErstelltAm { get; set; }
        public int TeilId { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Angebot> Angebot { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Bestellung> Bestellung { get; set; }
        public virtual Teil Teil { get; set; }
    }
}