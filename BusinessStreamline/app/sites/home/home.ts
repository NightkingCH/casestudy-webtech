﻿import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

import { SucheNachfrageRepository, TypRepository } from '../../repository/repository';
import { ViewSucheNachfrage, NachfrageSearch, Typ, NachfrageStatus } from '../../models/models';

@Component({
    selector: '[data-site-home]',
    templateUrl: 'app/sites/home/home.html',
    directives: [COMMON_DIRECTIVES]
})
export class HomeComponent {

    private sucheRepository: SucheNachfrageRepository = new SucheNachfrageRepository();
    private typRepository: TypRepository = new TypRepository();
    private data: Array<ViewSucheNachfrage> = [];
    private typList: Array<Typ> = [];
    private statusList: Array<NachfrageStatus> = [];

    private model: NachfrageSearch = new NachfrageSearch();

    constructor(private title: Title) {
        this.title.setTitle("Home - BLS");
    }

    public ngOnInit(): void {
        this.fetchTyp().then(() => {
            // trigger search AFTER the types are loaded!
            return this.fetchNachfrage();
        });

        this.setUpState();
    }

    public onSubmit(): void {
        this.fetchNachfrage();        
    }

    private fetchTyp(): Promise<void> {
        return this.typRepository.getAll().then((data: Array<Typ>) => {

            // add a selection element to the top.
            var nulloTyp = new Typ();

            nulloTyp.name = "Typ Auswählen";
            nulloTyp.typId = 0;

            this.typList = [nulloTyp].concat(data);
        });
    }

    private fetchNachfrage(): Promise<void> {
        return this.sucheRepository.get(this.model).then((data: Array<ViewSucheNachfrage>) => {
            this.data = data;
        });
    }

    private setUpState(): void {
        var bothState = new NachfrageStatus();

        var openState = new NachfrageStatus();
        openState.status = 0;
        openState.name = "Offen";

        var closeState = new NachfrageStatus();
        closeState.status = 1;
        closeState.name = "Geschlossen";

        this.statusList = [bothState, openState, closeState];        
    }
}