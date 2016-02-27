import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

import { SucheNachfrageRepository, TypRepository } from '../../repository/repository';
import { ViewSucheNachfrage, NachfrageSearch, Typ, NachfrageStatus } from '../../models/models';

@Component({
    selector: '[data-site-login]',
    templateUrl: 'app/sites/login/login.html',
    directives: [COMMON_DIRECTIVES]
})
export class LoginComponent {

    /*private sucheRepository: SucheNachfrageRepository = new SucheNachfrageRepository();
    private typRepository: TypRepository = new TypRepository();
    private data: Array<ViewSucheNachfrage> = [];
    private count: number = 0;
    private typList: Array<Typ> = [];
    private statusList: Array<NachfrageStatus> = [];

    private model: NachfrageSearch = new NachfrageSearch();

    constructor(private title: Title) {
        this.title.setTitle("Login - BLS");
    }

    public ngOnInit(): void {
        this.fetchTyp().then(() => {
            // trigger search AFTER the types are loaded!
            return Promise.all([this.countNachfrage(), this.fetchNachfrage()]);
        });

        this.setUpState();
    }

    public onSubmit(): void {
        Promise.all([this.countNachfrage(), this.fetchNachfrage()]);;        
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

    private countNachfrage(): Promise<void> {
        return this.sucheRepository.count(this.model).then((data: number) => {
            this.count = data;
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
    }*/
}