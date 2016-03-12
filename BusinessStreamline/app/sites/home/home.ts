import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

import { SucheNachfrageRepository, TypRepository } from '../../repository/repository';
import { ViewSucheNachfrage, NachfrageSearch, Typ, NachfrageStatus } from '../../models/models';
import { UserService } from '../../services/services';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Haupt"-Seite dar.
 */
@Component({
    selector: '[data-site-home]',
    templateUrl: 'app/sites/home/home.html',
    directives: [COMMON_DIRECTIVES]
})
export class HomeComponent {

    private sucheRepository: SucheNachfrageRepository = new SucheNachfrageRepository();
    private typRepository: TypRepository = new TypRepository();
    private data: Array<ViewSucheNachfrage> = [];
    private count: number = 0;
    private typList: Array<Typ> = [];
    private statusList: Array<NachfrageStatus> = [];
    private isLoggedIn: boolean = false;

    private model: NachfrageSearch = new NachfrageSearch();

    constructor(private title: Title, private userService: UserService) {
        this.title.setTitle("Home - BLS");

        this.isLoggedIn = this.userService.isLoggedIn();
    }

    /**
     * Angular2 life cycle event.
     */
    public ngOnInit(): void {
        this.fetchTyp().then(() => {
            // trigger search AFTER the types are loaded!
            return Promise.all([this.countNachfrage(), this.fetchNachfrage()]);
        });

        this.setUpState();
    }

    /**
     * Catches the form submit and triggers an ajax search.
     */
    public onSubmit(): void {
        Promise.all([this.countNachfrage(), this.fetchNachfrage()]);;
    }

    /**
     * Temporary IE-fix.
     */
    public onTypChange(event: Event): void {

        if (!event) {
            return;
        }

        var selectElement = (<HTMLSelectElement>event.target);

        if (isNaN(parseInt(selectElement.value))) {
            return;
        }

        this.model.typ = parseInt(selectElement.value);
    }

    /**
     * https://github.com/angular/angular/issues/7088
     */
    private trackByForSearch(index: number, object: ViewSucheNachfrage): number {
        return object.nachfrageId;
    }

    /**
     * Temporary IE-fix.
     */
    public onStateChange(event: Event): void {

        if (!event) {
            return;
        }

        var selectElement = (<HTMLSelectElement>event.target);

        if (isNaN(parseInt(selectElement.value))) {
            return;
        }

        this.model.state = parseInt(selectElement.value);
    }

    /**
     * Load lookup list.
     */
    private fetchTyp(): Promise<void> {
        return this.typRepository.getAll().then((data: Array<Typ>) => {

            // add a selection element to the top.
            var nulloTyp = new Typ();

            nulloTyp.name = "Typ Auswählen";
            nulloTyp.typId = 0;

            this.typList = [nulloTyp].concat(data);
        });
    }

    /**
     * Get requests based on the search arguments.
     */
    private fetchNachfrage(): Promise<void> {
        return this.sucheRepository.get(this.model).then((data: Array<ViewSucheNachfrage>) => {
            this.data = data;
        });
    }

    /**
     * Get the total amount of the found requests.
     */
    private countNachfrage(): Promise<void> {
        return this.sucheRepository.count(this.model).then((data: number) => {
            this.count = data;
        });
    }

    /**
     * Create dropdown list to filter the request state.
     */
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