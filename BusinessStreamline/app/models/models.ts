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
    erstelltAm: string;
    nachfrageId: number;
    angebotId: number;
}

export class Angebot {
    anbieter: Anbieter;
    bestellung: Bestellung[];
    nachfrage: Nachfrage;
    angebotId: number;
    erstelltAm: string;
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
    erstelltAm: string;
    teilId: number;
}

export class Teil {
    nachfrage: Nachfrage[];
    produkt: Produkt;
    teilId: number;
    produktId: number;
    anzahl: number;
    name: string;
}

export class Produkt {
    firma: Firma;
    teil: Teil[];
    produktId: number;
    name: string;
    firmaId: number;
}