/***
 *
 * Enthält alle Entitäten sowie Views.
 *
 ***/

export class Login {
    public anbieter: Anbieter[];
    public firma: Firma[];
    public loginId: number;
    public name: string;
    public password: string;
}

export class Firma {
   public produkt: Produkt[];
   public login: Login;
   public firmaId: number;
   public loginId: number;
}

export class Anbieter {
   public angebot: Angebot[];
   public login: Login;
   public anbieterId: number;
   public loginId: number;
}

export class Bestellung {
    public angebot: Angebot;
    public nachfrage: Nachfrage;
    public bestellungId: number;
    public erstelltAm: Date;
    public nachfrageId: number;
    public angebotId: number;
}

export class Angebot {
    public anbieter: Anbieter;
    public bestellung: Bestellung[];
    public nachfrage: Nachfrage;
    public angebotId: number;
    public erstelltAm: Date;
    public status: number;
    public preisProTeil: number;
    public anbieterId: number;
    public nachfrageId: number;
}

export class Nachfrage {
    public angebot: Angebot[];
    public bestellung: Bestellung[];
    public teil: Teil;
    public nachfrageId: number;
    public anzahl: number;
    public erstelltAm: Date;
    public liefertermin: Date;
    public teilId: number;
}

export class Teil {
    public nachfrage: Nachfrage[];
    public produkt: Produkt;
    public typ: Typ;
    public teilId: number;
    public produktId: number;
    public typId: number = 0;
    public qualitaetId: number = 0;
    public anzahl: number;
    public name: string;
}

export class Typ {
    public typId: number;
    public name: string;
    public code: string;
    public teil: Teil[];
}

export class Qualitaet {
    public qualitaetId: number;
    public name: string;
    public code: string;
    public teil: Teil[];
}

export class Produkt {
    public firma: Firma;
    public teil: Teil[];
    public produktId: number;
    public name: string;
    public firmaId: number;
}

/* Hilfsklassen / Models */
export class NachfrageSearch {
    public search: string;
    public typ: number;
    public page: number;
    public take: number;
    public state: number;

    constructor() {
        this.search = null;
        this.state = -1;
        this.typ = 0;
        this.page = 0;
        this.take = 20;
    }
}

export class ViewTeil {
    public teilId: number;
    public teilName: string;
    public anzahl: number;
    public typId: number;
    public typName: string;
    public produktId: number;
    public produktName: string;
    public hatOffeneNachfrage: boolean;
    public offeneNachfrageId: number;
    public qualitaetId: number;
    public teilQualitaetName: string;
}

export class ViewSucheNachfrage {
    public nachfrageId: number;
    public anzahl: number;
    public erstelltAm: Date;
    public liefertermin: Date;
    public teilId: number;
    public teilName: string;
    public typId: number;
    public typName: string;
    public produktId: number;
    public produktName: string;
    public hatBestellung: boolean;
    public qualitaetId: number;
    public teilQualitaetName: string;
}

export class ViewNachfrage {
    public nachfrageId: number;
    public anzahl: number;
    public erstelltAm: Date;
    public liefertermin: Date;
    public anzahlAngebote: number;
    public besterPreis: number;
    public firmaId: number;
    public loginId: number;
    public istOffen: boolean;
    public produktName: string;
    public produktId: number;
    public teilName: string;
    public bestellungId: number;
    public qualitaetId: number;
    public teilQualitaetName: string;
}

export class ViewAngebot {
    public angebotId: number;
    public erstelltAm: Date;
    public preisProTeil: number;
    public status: number;
    public name: string;
    public nachfrageId: number;
    public preisTotal: number;
    public istBestesAngebot: number;
}

export class NachfrageStatus {
    public status: number = -1;
    public name: string = "Status Auswählen";
}

export class ViewAngebotAnbieter {
    public angebotId: number;
    public anbieterId: number;
    public erstelltAm: Date;
    public preisProTeil: number;
    public status: number;
    public nachfrageId: number;
    public produktName: string;
    public teilName: string;
    public liefertermin: Date;
    public qualitaetId: number;
    public teilQualitaetName: string;
}

export class ViewBestellung {
    public angebotId: number;
    public preisProTeil: number;
    public teilName: string;
    public produktId: number;
    public produktName: string;
    public anbieterName: string;
    public firmaName: number;
    public bestellDatum: Date;
    public firmaLoginId: number;
    public anbieterLoginId: number;
    public firmaId: number;
    public erstelltAm: Date;
    public nachfrageId: number;
    public liefertermin: Date;
    public bestellungId: number;
    public anbieterId: number;
    public qualitaetId: number;
    public teilQualitaetName: string;
}
