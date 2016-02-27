import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { UserService } from '../../../services/services';

import { AngebotRepository, NachfrageRepository } from '../../../repository/repository';
import { ViewNachfrage, Angebot } from '../../../models/models';

@Component({
    selector: '[data-site-add-angebot]',
    templateUrl: 'app/sites/angebot/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class AngebotAddComponent {

    private nachfrageId: number;
    private model: Angebot = new Angebot();
    private data: ViewNachfrage;

    private repository: NachfrageRepository = new NachfrageRepository();
    private angebotRepository: AngebotRepository = new AngebotRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService) {
        this.nachfrageId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.nachfrageId)) {
            router.navigateByUrl("/home");
        }

        this.title.setTitle("Angebot | Hinzufügen - BLS");
    }

    public ngOnInit(): void {
        if (isNaN(this.nachfrageId)) {
            return;
        }

        this.fetchAngebot();
    }

    public onAdd(event: MouseEvent): void {

        // TODO: add when user service is available.
        //if (this.userService.isFirma()) {
        //    return; // companies can't create an offer.
        //}

        this.model.nachfrageId = this.nachfrageId;
        this.model.anbieterId = 1; // TODO: Add proper user! => this.userService.anbieter.anbieterId;
        this.model.erstelltAm = moment().toDate();
        this.model.status = 0; // 0 = Offen, 1 = Akzeptiert, 2 = Geschlossen

        this.angebotRepository.post(this.model).then(() => {
            this.router.navigateByUrl("/nachfrage/" + this.nachfrageId);
        });
    }

    private fetchAngebot(): void {
        this.repository.get(this.nachfrageId).then((data: ViewNachfrage) => {
            this.data = data;
        });
    }
}