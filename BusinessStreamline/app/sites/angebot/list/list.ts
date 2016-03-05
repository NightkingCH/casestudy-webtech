import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

import { UserService } from '../../../services/services';
import { AngebotRepository } from '../../../repository/repository';
import { ViewAngebotAnbieter } from '../../../models/models';

@Component({
    selector: '[data-site-list-angebot]',
    templateUrl: 'app/sites/angebot/list/list.html',
    directives: [COMMON_DIRECTIVES]
})
export class AngebotListComponent {

    private repository: AngebotRepository = new AngebotRepository();
    private data: Array<ViewAngebotAnbieter> = [];

    constructor(private router: Router, private userService: UserService, private title: Title) {
        this.title.setTitle("Angebotsliste - BLS");

        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // suppliers don't own any offers!
        if (this.userService.isFirma()) {
            this.router.navigateByUrl("/home");

            return;
        }
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): Promise<void> {
        return this.repository.getByAnbieter(this.userService.anbieter.anbieterId).then((data: Array<ViewAngebotAnbieter>) => {
            this.data = data;
        });
    }
}