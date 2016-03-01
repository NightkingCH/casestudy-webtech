import { Inject } from 'angular2/core';
import { Router } from 'angular2/router';

import { LoginRepository } from '../repository/repository';
import { Login, Firma, Anbieter } from '../models/models';

export class UserService {

    // inject router to navigate to home after logout;
    constructor( @Inject(Router) private router: Router) {
    }

    //public user: Login;

    // company
    public user: Login = {
        loginId: 1001,
        name: "Derek82",
        password: "",
        firma: [{
            firmaId: 1001,
            loginId: 1001,
            produkt: null,
            login: null
        }],
        anbieter: []
    };
    
    // supplier
    //public user: Login = {
    //    loginId: 1004,
    //    name: "Erin418",
    //    password: "",
    //    anbieter: [{
    //        anbieterId: 1004,
    //        loginId: 1004,
    //        angebot: [],
    //        login: null
    //    }],
    //    firma: []
    //};

    get firma(): Firma {
        if (!this.isFirma()) {
            return null;
        }

        return this.user.firma[0]; // logically there is only one company per login
    }

    get anbieter(): Anbieter {
        if (!this.isAnbieter()) {
            return null;
        }

        return this.user.anbieter[0]; // logically there is only one supplier per login
    }

    public isLoggedIn(): boolean {
        return this.user != null;
    }

    public isFirma(): boolean {
        if (!this.isLoggedIn()) {
            return false;
        }

        if (!this.user.firma) {
            return false;
        }

        if (this.user.firma.length <= 0) {
            return false;
        }

        return true;
    }

    public isAnbieter(): boolean {
        if (!this.isLoggedIn()) {
            return false;
        }

        if (!this.user.anbieter) {
            return false;
        }

        if (this.user.anbieter.length <= 0) {
            return false;
        }

        return true;
    }

    public login(): void {

    }

    public logout(): void {
        this.user = null;
    }


}