import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

import { UserService } from '../../../services/services';

import { PIPES } from '../../../pipes/pipes';

import { NachfrageRepository } from '../../../repository/repository';
import { ViewNachfrage } from '../../../models/models';

@Component({
    selector: '[data-site-list-nachfrage]',
    templateUrl: 'app/sites/nachfrage/list/list.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class NachfrageListComponent {

    private nachfrageRepository: NachfrageRepository = new NachfrageRepository();
    private data: Array<ViewNachfrage> = [];

    constructor(private router: Router, private userService: UserService, private title: Title) {
        this.title.setTitle("Nachfrageliste - BLS");

        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // suppliers don't have any requests!
        if (this.userService.isAnbieter()) {
            this.router.navigateByUrl("/home");

            return;
        }
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): Promise<void> {
        return this.nachfrageRepository.getByFirma(this.userService.firma.firmaId, this.userService.user.loginId).then((data: Array<ViewNachfrage>) => {
            this.data = data;
        });
    }
}