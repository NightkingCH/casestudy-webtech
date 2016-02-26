import { Component, ViewChildren, QueryList, ElementRef } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { SuchModel, ViewSucheNachfrage } from '../../models/models';

import { SucheNachfrageRepository } from '../../repository/repository';

@Component({
    selector: '[data-site-suche]',
    templateUrl: 'app/sites/suche/suche.html',
    directives: [COMMON_DIRECTIVES]
})
export class SucheComponent {

    private repository: SucheNachfrageRepository = new SucheNachfrageRepository();
    private model: SuchModel = new SuchModel();

    private data: Array<ViewSucheNachfrage> = [];

    public ngOnInit(): void {
        this.fetchData();
    }

    public onSearch(): void {
        this.fetchData(this.model.stichwort);
    }

    private fetchData(str: string = ""): void {
        this.repository.get(str).then((data: Array<ViewSucheNachfrage>) => {
            this.data = data;
        });
    }
}