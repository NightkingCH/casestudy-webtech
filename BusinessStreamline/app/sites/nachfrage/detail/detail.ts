﻿import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { AngebotRepository, NachfrageRepository, BestellungRepository } from '../../../repository/repository';
import { ViewNachfrage, ViewAngebot, Bestellung } from '../../../models/models';

import { UserService } from '../../../services/services';

@Component({
    selector: '[data-site-detail-nachfrage]',
    templateUrl: 'app/sites/nachfrage/detail/detail.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class NachfrageDetailComponent {

    private nachfrageId: number;
    private model: ViewNachfrage;
    private data: Array<ViewAngebot> = [];
    private canCreateOffer: boolean = false;
    private canChangeState: boolean = false;

    private repository: NachfrageRepository = new NachfrageRepository();
    private angebotRepository: AngebotRepository = new AngebotRepository();
    private bestellRepository: BestellungRepository = new BestellungRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService) {
        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        this.nachfrageId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.nachfrageId)) {
            this.router.navigateByUrl("/home");

            return;
        }

        this.canCreateOffer = this.userService.isAnbieter();;

        this.title.setTitle("Nachfrage " + this.nachfrageId.toString() + " - BLS");
    }

    public ngOnInit(): void {
        if (isNaN(this.nachfrageId)) {
            return;
        }

        this.fetchDetail().then(() => {
            this.canChangeState = this.userService.isFirma() && this.userService.firma.firmaId == this.model.firmaId;

            this.setUpUI();
        });
    }

    private setUpUI(): void {
        $('[data-toggle="tooltip"]').tooltip();
    }

    public onAcceptAngebot(event: MouseEvent, entity: ViewAngebot): void {

        // TODO FIX WRONG FIRMA ID!
        // suppliers can't accept an offer
        if (this.userService.isAnbieter()) {
            return;
        }

        if (!this.canChangeState) {
            return;
        }

        //TODO only accept own offers!
        var offersToDecline = Enumerable.from(this.data).where((x: ViewAngebot) => x.angebotId != entity.angebotId);

        // create new order based on the selected offer.
        var bestellung: Bestellung = new Bestellung();
        bestellung.angebotId = entity.angebotId;
        bestellung.nachfrageId = this.nachfrageId;
        bestellung.erstelltAm = moment().toDate();

        // create order
        // then set offer to accepted
        // then decline the other offers.

        this.bestellRepository.post(this.userService.firma.firmaId, bestellung).then(() => {
            return this.acceptAngebot(entity).then(() => {
                // only decline offers if the first has been accepted!
                var promiselist: Array<Promise<ViewAngebot>> = [];

                // create a declien task for each offer => multiple requests
                offersToDecline.forEach((x: ViewAngebot) => {
                    promiselist.push(this.declineAngebot(x));
                });

                // wait until all offers are declined => then reload view.
                return Promise.all(promiselist);

            }).then(() => {
                return this.fetchDetail();
            });
        });
    }

    public onDeclineAngebot(event: MouseEvent, entity: ViewAngebot): void {
        // suppliers can't accept an offer
        if (this.userService.isAnbieter()) {
            return;
        }

        if (!this.canChangeState) {
            return;
        }

        this.declineAngebot(entity).then(() => {
            return this.fetchAngebot();
        });
    }

    private acceptAngebot(entity: ViewAngebot): Promise<ViewAngebot> {
        return this.angebotRepository.acceptAngebot(this.userService.firma.firmaId, entity);
    }

    private declineAngebot(entity: ViewAngebot): Promise<ViewAngebot> {
        return this.angebotRepository.declineAngebot(this.userService.firma.firmaId, entity);
    }

    private fetchDetail(): Promise<any> {
        return this.fetchNachfrage().then(() => {
            return this.fetchAngebot();
        });
    }

    private fetchNachfrage(): Promise<ViewNachfrage> {
        return this.repository.get(this.nachfrageId).then((data: ViewNachfrage) => {
            this.model = data;

            return data;
        });
    }

    private fetchAngebot(): Promise<Array<ViewAngebot>> {
        return this.angebotRepository.getByNachfrage(this.nachfrageId).then((data: Array<ViewAngebot>) => {
            this.data = data;

            return data;
        });
    }
}