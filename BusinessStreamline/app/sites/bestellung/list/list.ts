import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

import { UserService } from '../../../services/services';
import { BestellungRepository } from '../../../repository/repository';
import { ViewBestellung } from '../../../models/models';
import { PIPES } from '../../../pipes/pipes';

@Component({
    selector: '[data-site-list-bestellung]',
    templateUrl: 'app/sites/bestellung/list/list.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class BestellungListComponent {

    private repository: BestellungRepository = new BestellungRepository();
    private data: Array<ViewBestellung> = [];

    constructor(private router: Router, private userService: UserService, private title: Title) {
        this.title.setTitle("Bestellliste - BLS");

        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): Promise<void> {
        if (this.userService.isFirma()) {
            return this.repository.getOverviewByFirma(this.userService.firma.firmaId).then((data: Array<ViewBestellung>) => {
                this.data = data;
            });
        }

        if (this.userService.isAnbieter()) {
            return this.repository.getOverviewByAnbieter(this.userService.anbieter.anbieterId).then((data: Array<ViewBestellung>) => {
                this.data = data;
            });
        }
    }
}