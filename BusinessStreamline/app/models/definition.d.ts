    export interface Login {
        Id: string;
        Anbieter: any[];
        Firma: Firma[];
        LoginId: number;
        Name: string;
        Password: string;
    }

    export interface Firma {
        Produkt: Produkt[];
        Login: Login;
        FirmaId: number;
        LoginId: number;
    }

    export interface Produkt {
        Firma: Firma;
        ProduktId: number;
        Name: string;
        FirmaId: number;
    }