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
    
    public partial class Angebot
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Angebot()
        {
            this.Bestellung = new HashSet<Bestellung>();
        }
    
        public int AngebotId { get; set; }
        public Nullable<System.DateTime> ErstelltAm { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<decimal> PreisProTeil { get; set; }
        public int AnbieterId { get; set; }
        public int NachfrageId { get; set; }
    
        public virtual Anbieter Anbieter { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Bestellung> Bestellung { get; set; }
        public virtual Nachfrage Nachfrage { get; set; }
    }
}
