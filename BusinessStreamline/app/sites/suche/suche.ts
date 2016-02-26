import { Component, ViewChildren, QueryList, ElementRef } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { NachfrageSearch, ViewSucheNachfrage } from '../../models/models';

import { SucheNachfrageRepository } from '../../repository/repository';

@Component({
    selector: '[data-site-suche]',
    templateUrl: 'app/sites/suche/suche.html',
    directives: [COMMON_DIRECTIVES]
})
export class SucheComponent {

    private repository: SucheNachfrageRepository = new SucheNachfrageRepository();
    private model: NachfrageSearch = new NachfrageSearch();

    private data: Array<ViewSucheNachfrage> = [];

    public ngOnInit(): void {
        this.fetchData(this.model);
    }

    public onSearch(): void {
        this.fetchData(this.model);
    }

    private fetchData(src: NachfrageSearch): void {
        this.repository.get(src).then((data: Array<ViewSucheNachfrage>) => {
            this.data = data;
        });
    }
}