import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

import { UserService } from '../../../services/services';

import { NachfrageRepository } from '../../../repository/repository';
import { ViewNachfrage } from '../../../models/models';

@Component({
    selector: '[data-site-list-nachfrage]',
    templateUrl: 'app/sites/nachfrage/list/list.html',
    directives: [COMMON_DIRECTIVES]
})
export class NachfrageListComponent {

    private nachfrageRepository: NachfrageRepository = new NachfrageRepository();
    private data: Array<ViewNachfrage> = [];

    constructor(private userService: UserService, private title: Title) {
        this.title.setTitle("Nachfrageliste - BLS");
    }

    public ngOnInit(): void {
        this.fetchData();
    }

    private fetchData(): Promise<void> {
        //TODO change to user service!
        return this.nachfrageRepository.getByFirma(4, 559).then((data: Array<ViewNachfrage>) => {
            this.data = data;
        });
    }
}