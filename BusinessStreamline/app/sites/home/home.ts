import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { SucheNachfrageRepository, TypRepository } from '../../repository/repository';
import { SucheNachfrage, Search, Typ } from '../../models/models';

@Component({
    selector: '[data-site-home]',
    templateUrl: 'app/sites/home/home.html',
    directives: [COMMON_DIRECTIVES]
})
export class HomeComponent {

    private sucheRepository: SucheNachfrageRepository = new SucheNachfrageRepository();
    private typRepository: TypRepository = new TypRepository();
    private data: Array<SucheNachfrage> = [];
    private typList: Array<Typ> = [];
    private model: Search = new Search();

    public ngOnInit(): void {
        this.fetchTyp().then(() => {
            // trigger search AFTER the types are loaded!
            return this.fetchNachfrage();
        });
    }

    public onSubmit(): void {
        this.fetchNachfrage();        
    }

    private fetchTyp(): Promise<void> {
        return this.typRepository.getAll().then((data: Array<Typ>) => {

            // add a selection element to the top.
            var nulloTyp = new Typ();

            nulloTyp.name = "Auswählen";
            nulloTyp.typId = 0;

            this.typList = [nulloTyp].concat(data);
        });
    }

    private fetchNachfrage(): Promise<void> {
        return this.sucheRepository.get(this.model.search, this.model.page, this.model.typ, this.model.take).then((data: Array<SucheNachfrage>) => {
            this.data = data;
        });
    }

}