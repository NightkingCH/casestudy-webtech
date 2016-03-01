import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';
import { Router } from 'angular2/router';

import { UserService } from '../../services/services';

@Component({
    selector: '[data-site-logout]',
    templateUrl: 'app/sites/logout/logout.html',
    directives: [COMMON_DIRECTIVES]
})
export class LogoutComponent {

    constructor(private router: Router, private title: Title, private userService: UserService) {
        this.title.setTitle("Logout - BLS");

        // redirect trolls to home
        if (!this.userService.user) {
            this.router.navigateByUrl("/home");
        }
    }

    public onLogout(): void {
        this.userService.logout();
        this.router.navigateByUrl("/home"); // redirect to home after logout.
    }

}