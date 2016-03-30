import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { AngebotRepository, NachfrageRepository, BestellungRepository } from '../../../repository/repository';
import { ViewNachfrage, ViewAngebot, Bestellung } from '../../../models/models';

import { UserService } from '../../../services/services';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Nachrage Detailansicht"-Seite dar.
 */
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

    private hasData: boolean = false;
    private istFirma: boolean = false;
    private istAnbieter: boolean = false;

    private repository: NachfrageRepository = new NachfrageRepository();
    private angebotRepository: AngebotRepository = new AngebotRepository();
    private bestellRepository: BestellungRepository = new BestellungRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService) {
        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // read the id to load the corresponding detail data.
        this.nachfrageId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.nachfrageId)) {
            this.router.navigateByUrl("/home");

            return;
        }

        // UI trigger for buttons.
        this.canCreateOffer = this.userService.isAnbieter();

        this.title.setTitle("Nachfrage " + this.nachfrageId.toString() + " - BLS");
    }

    /**
     * @description
     * Angular2 life cycle event.
     */
    public ngOnInit(): void {

        this.istFirma = this.userService.isFirma();
        this.istAnbieter = this.userService.isAnbieter();

        this.fetchDetail().then(() => {
            this.hasData = true;

            // only a company and the owner of a request can change the state of an offer.
            this.canChangeState = this.userService.isFirma() && this.userService.firma.firmaId == this.model.firmaId;

            this.setUpUI();
        });
    }

    private setUpUI(): void {
        $('[data-toggle="tooltip"]').tooltip();
    }

    /**
     * https://github.com/angular/angular/issues/7088
     */
    private trackByForOffers(index: number, object: ViewAngebot): number {
        return object.angebotId;
    }

    /**
     * Accepts and offer and declines all other offers.
     * Creates an order!
     * @param event button click event.
     * @param entity offer which was accepted.
     */
    public onAcceptAngebot(event: MouseEvent, entity: ViewAngebot): void {

        // suppliers can't accept an offer
        if (this.userService.isAnbieter()) {
            return;
        }

        // not the owner or a company
        if (!this.canChangeState) {
            return;
        }

        // filter all offers to decline those who aren't accepted.
        var offersToDecline = Enumerable.from(this.data).where((x: ViewAngebot) => x.angebotId != entity.angebotId);

        // create new order based on the selected offer.
        var bestellung: Bestellung = new Bestellung();
        bestellung.angebotId = entity.angebotId;
        bestellung.nachfrageId = this.nachfrageId;
        bestellung.erstelltAm = moment().toDate();

        // create order
        // then set offer to accepted
        // then decline the other offers.
        this.bestellRepository.post(this.userService.firma.firmaId, bestellung).then((data: Bestellung) => {

            bestellung = data;

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
                return this.bestellRepository.createXml(this.userService.firma.firmaId, bestellung.bestellungId);
            }).then(() => {
                toastr.success("Bestellung wurde erstellt.");

                return this.fetchDetail();
            });
        });
    }

    /**
     * Decline a single offer.
     * @param event button click event.
     * @param entity offer to decline.
     */
    public onDeclineAngebot(event: MouseEvent, entity: ViewAngebot): void {
        // suppliers can't accept an offer
        if (this.userService.isAnbieter()) {
            return;
        }

        // not a company nor the owner.
        if (!this.canChangeState) {
            return;
        }

        this.declineAngebot(entity).then(() => {
            return this.fetchAngebot();
        });
    }

    /**
     * Sends the accept offer request.
     * @param entity
     */
    private acceptAngebot(entity: ViewAngebot): Promise<ViewAngebot> {
        return this.angebotRepository.acceptAngebot(this.userService.firma.firmaId, entity);
    }

    /**
     * Sends the decline offer request.
     * @param entity
     */
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