import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

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

    constructor(private userService: UserService) {
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): Promise<void> {
        //TODO change to user service!
        return this.produktRepository.getByFirma(4, 559).then((data: Array<Produkt>) => {
            this.data = data;
        });
    }
}