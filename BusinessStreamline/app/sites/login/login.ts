import { Component } from 'angular2/core';
import { Router } from 'angular2/router';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';
import { UserService } from '../../services/services';

import { SucheNachfrageRepository, TypRepository, LoginRepository } from '../../repository/repository';
import { ViewSucheNachfrage, NachfrageSearch, Typ, NachfrageStatus, Login } from '../../models/models';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Login"-Seite dar.
 */
@Component({
    selector: '[data-site-login]',
    templateUrl: 'app/sites/login/login.html',
    directives: [COMMON_DIRECTIVES]
})
export class LoginComponent {

    private model = new Login();

    constructor(private userService: UserService, private router: Router) {
    }

    private userLogin(): void {
        var loginPromise = new LoginRepository().login(this.model);

        loginPromise.catch(() => {
            toastr.error("Benutzername oder Passwort ist ungültig!");
        });

        loginPromise.then((data: Login) => {
            this.userService.user = data;
            this.router.navigateByUrl("/home");
        });
    }
}
