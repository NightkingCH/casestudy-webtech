import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

import { UserService } from '../../../services/services';
import { ProduktRepository } from '../../../repository/repository';
import { Produkt } from '../../../models/models';

@Component({
    selector: '[data-site-list-produkt]',
    templateUrl: 'app/sites/produkt/list/list.html',
    directives: [COMMON_DIRECTIVES]
})
export class ProduktListComponent {

    private produktRepository: ProduktRepository = new ProduktRepository();
    private data: Array<Produkt> = [];

    constructor(private router: Router, private userService: UserService, private title: Title) {
        this.title.setTitle("Produkteliste - BLS");

        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // suppliers don't own any products!
        if (this.userService.isAnbieter()) {
            this.router.navigateByUrl("/home");

            return;
        }
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): Promise<void> {
        return this.produktRepository.getByFirma(this.userService.firma.firmaId, this.userService.user.loginId).then((data: Array<Produkt>) => {
            this.data = data;
        });
    }
}