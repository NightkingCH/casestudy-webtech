export class Login {
    anbieter: Anbieter[];
    firma: Firma[];
    loginId: number;
    name: string;
    password: string;
}

export class Firma {
    produkt: Produkt[];
    login: Login;
    firmaId: number;
    loginId: number;
}

export class Anbieter {
    angebot: Angebot[];
    login: Login;
    anbieterId: number;
    loginId: number;
}

export class Bestellung {
    angebot: Angebot;
    nachfrage: Nachfrage;
    bestellungId: number;
    erstelltAm: Date;
    nachfrageId: number;
    angebotId: number;
}

export class Angebot {
    anbieter: Anbieter;
    bestellung: Bestellung[];
    nachfrage: Nachfrage;
    angebotId: number;
    erstelltAm: Date;
    status: number;
    preisProTeil: number;
    anbieterId: number;
    nachfrageId: number;
}

export class Nachfrage {
    angebot: Angebot[];
    bestellung: Bestellung[];
    teil: Teil;
    nachfrageId: number;
    anzahl: number;
    erstelltAm: Date;
    teilId: number;
}

export class Teil {
    nachfrage: Nachfrage[];
    produkt: Produkt;
    typ: Typ;
    teilId: number;
    produktId: number;
    typId: number;
    anzahl: number;
    name: string;
}

export class Typ {
    typId: number;
    name: string;
    code: string;
    teil: Teil[];
}

export class Produkt {
    firma: Firma;
    teil: Teil[];
    produktId: number;
    name: string;
    firmaId: number;
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
}

export class ViewSucheNachfrage {
    public nachfrageId: number;
    public anzahl: number;
    public erstelltAm: Date;
    public teilId: number;
    public teilName: string;
    public typId: number;
    public typName: string;
    public produktId: number;
    public produktName: string;
    public hatBestellung: boolean;
}

export class ViewNachfrage {
    public nachfrageId: number;
    public anzahl: number;
    public erstelltAm: Date;
    public anzahlAngebote: number;
    public besterPreis: number;
    public firmaId: number;
    public loginId: number;
    public istOffen: boolean;
    public produktName: string;
    public produktId: number;
    public teilName: string;
    public bestellungId: number;
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