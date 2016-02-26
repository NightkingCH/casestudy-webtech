import { Inject } from 'angular2/core';
import { Router } from 'angular2/router';

import { LoginRepository } from '../repository/repository';
import { Login } from '../models/models';

export class UserService {

    // inject router to navigate to home after logout;
    constructor( @Inject(Router) private router: Router) {
    }

    public user: Login;

    public isLoggedIn(): boolean {
        return this.user != null;
    }

    public login(): void {

    }

    public logout(): void {
        this.user = null;

        //TODO: redirect user to home;
    }


}