import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { UserService } from '../../../services/services';

import { TeilRepository, NachfrageRepository } from '../../../repository/repository';
import { ViewTeil, Nachfrage } from '../../../models/models';

@Component({
    selector: '[data-site-add-nachfrage]',
    templateUrl: 'app/sites/nachfrage/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class NachfrageAddComponent {

    private teilId: number;
    private model: Nachfrage = new Nachfrage();
    private data: ViewTeil;

    private repository: TeilRepository = new TeilRepository();
    private nachfrageRepository: NachfrageRepository = new NachfrageRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService) {
        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");
        }

        // redirect suppliers. only companies can create a request.
        if (this.userService.isAnbieter()) {
            this.router.navigateByUrl("/nachfrage/" + this.data.offeneNachfrageId);

            return;
        }

        this.teilId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.teilId)) {
            this.router.navigateByUrl("/home");
        }

        this.title.setTitle("Nachfrage | Hinzufügen - BLS");
    }

    public ngOnInit(): void {
        if (isNaN(this.teilId)) {
            return;
        }

        this.fetchTeil();
    }

    public onAdd(event: MouseEvent): void {
        if (this.userService.isAnbieter()) {
            return; // suppliers can't create a request.
        }

        if (isNaN(this.model.anzahl)) {
            return;
        }

        if (this.model.anzahl <= 0) {
            return;
        }

        this.model.teilId = this.teilId;
        this.model.erstelltAm = moment().toDate();

        this.nachfrageRepository.post(this.userService.firma.firmaId, this.model).then((entity: Nachfrage) => {
            this.router.navigateByUrl("/nachfrage/" + entity.nachfrageId);
        });
    }

    private fetchTeil(): Promise<ViewTeil> {
        return this.repository.get(this.teilId).then((data: ViewTeil) => {
            this.model.anzahl = data.anzahl;
            this.data = data;

            return data;
        });
    }
}