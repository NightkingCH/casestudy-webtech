import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { UserService } from '../../../services/services';

import { AngebotRepository, NachfrageRepository } from '../../../repository/repository';
import { ViewNachfrage, Angebot } from '../../../models/models';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Angebot hinzufügen"-Seite dar.
 */
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
        this.title.setTitle("Angebot | Hinzufügen - BLS");

        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // read the request id to link the offer to the corresponding request.
        this.nachfrageId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.nachfrageId)) {
            this.router.navigateByUrl("/home");

            return;
        }

        // companies can't add an offer.
        if (this.userService.isFirma()) {
            this.router.navigateByUrl("/nachfrage" + this.nachfrageId);

            return;
        }
    }

    /**
     * @description
     * Angular2 life cycle event.
     */
    public ngOnInit(): void {
        if (isNaN(this.nachfrageId)) {
            return;
        }

        this.fetchAngebot();
    }

    /**
     * Click-Event when the offer should be created.
     * @param event button click event.
     */
    public onAdd(event: MouseEvent): void {

        if (this.userService.isFirma()) {
            return; // companies can't create an offer.
        }

        if (this.model.preisProTeil <= 0) {
            return; // bid must be higher than 0
        }

        if (isNaN(this.model.preisProTeil)) {
            return; // bid is not a number => maybe something like "afsadfwe83432,32"
        }

        // create the entity to send to the web service
        this.model.nachfrageId = this.nachfrageId;
        this.model.anbieterId = this.userService.anbieter.anbieterId;
        this.model.erstelltAm = moment().toDate();
        this.model.status = 0; // 0 = Offen, 1 = Akzeptiert, 2 = Geschlossen

        // send the model to the web service
        this.angebotRepository.post(this.model).then(() => {
            this.router.navigateByUrl("/nachfrage/" + this.nachfrageId);
        });
    }

    private fetchAngebot(): Promise<void> {
        return this.repository.get(this.nachfrageId).then((data: ViewNachfrage) => {
            this.data = data;
        });
    }
}