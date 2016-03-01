﻿import { Inject } from 'angular2/core';
import { Router } from 'angular2/router';

import { LoginRepository } from '../repository/repository';
import { Login, Firma, Anbieter } from '../models/models';

export class UserService {

    // inject router to navigate to home after logout;
    constructor( @Inject(Router) private router: Router) {
    }

    public user: Login = {
        loginId: 559,
        name: "Derek82",
        password: "",
        firma: [{
            firmaId: 5,
            loginId: 559,
            produkt: null,
            login: null
        }],
        anbieter: []
    };

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
        if (!this.user.firma) {
            return false;
        }

        if (this.user.firma.length <= 0) {
            return false;
        }

        return true;
    }

    public isAnbieter(): boolean {
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

        //TODO: redirect user to home;
    }


}