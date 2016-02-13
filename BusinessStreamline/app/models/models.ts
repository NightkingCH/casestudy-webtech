export class Login {
    Anbieter: Anbieter[];
    Firma: Firma[];
    LoginId: number;
    Name: string;
    Password: string;
}

export class Firma {
    Produkt: Produkt[];
    Login: Login;
    FirmaId: number;
    LoginId: number;
}

export class Anbieter {
    Angebot: Angebot[];
    Login: Login;
    AnbieterId: number;
    LoginId: number;
}

export class Bestellung {
    Angebot: Angebot;
    Nachfrage: Nachfrage;
    BestellungId: number;
    ErstelltAm: string;
    NachfrageId: number;
    AngebotId: number;
}

export class Angebot {
    Anbieter: Anbieter;
    Bestellung: Bestellung[];
    Nachfrage: Nachfrage;
    AngebotId: number;
    ErstelltAm: string;
    Status: number;
    PreisProTeil: number;
    AnbieterId: number;
    NachfrageId: number;
}

export class Nachfrage {
    Angebot: Angebot[];
    Bestellung: Bestellung[];
    Teil: Teil;
    NachfrageId: number;
    Anzahl: number;
    ErstelltAm: string;
    TeilId: number;
}

export class Teil {
    Nachfrage: Nachfrage[];
    Produkt: Produkt;
    TeilId: number;
    ProduktId: number;
    Anzahl: number;
    Name: string;
}

export class Produkt {
    Firma: Firma;
    Teil: Teil[];
    ProduktId: number;
    Name: string;
    FirmaId: number;
}