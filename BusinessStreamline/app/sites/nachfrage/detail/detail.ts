import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { AngebotRepository, NachfrageRepository, BestellungRepository } from '../../../repository/repository';
import { ViewNachfrage, ViewAngebot, Bestellung } from '../../../models/models';

@Component({
    selector: '[data-site-detail-nachfrage]',
    templateUrl: 'app/sites/nachfrage/detail/detail.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class NachfrageDetailComponent {

    private detailId: number;
    private model: ViewNachfrage;
    private data: Array<ViewAngebot> = [];

    private repository: NachfrageRepository = new NachfrageRepository();
    private angebotRepository: AngebotRepository = new AngebotRepository();
    private bestellRepository: BestellungRepository = new BestellungRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title) {
        this.detailId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.detailId)) {
            router.navigateByUrl("/home");
        }

        this.title.setTitle("Nachfrage " + this.detailId.toString() + " - BLS");
    }

    public ngOnInit(): void {
        if (isNaN(this.detailId)) {
            return;
        }

        this.fetchDetail().then(() => {
            this.setUpUI();
        });
    }

    private setUpUI(): void {
        $('[data-toggle="tooltip"]').tooltip();
    }

    public onAcceptAngebot(event: MouseEvent, entity: ViewAngebot): void {
        //TODO only accept own offers!
        var offersToDecline = Enumerable.from(this.data).where((x: ViewAngebot) => x.angebotId != entity.angebotId);

        // create new order based on the selected offer.
        var bestellung: Bestellung = new Bestellung();
        bestellung.angebotId = entity.angebotId;
        bestellung.nachfrageId = this.detailId;
        bestellung.erstelltAm = moment().toDate();

        // create order
        // then set offer to accepted
        // then decline the other offers.

        this.bestellRepository.post(bestellung).then(() => {
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
        this.declineAngebot(entity).then(() => {
            return this.fetchAngebot();
        });
    }

    private acceptAngebot(entity: ViewAngebot): Promise<ViewAngebot> {
        return this.angebotRepository.acceptAngebot(entity);
    }

    private declineAngebot(entity: ViewAngebot): Promise<ViewAngebot> {
        return this.angebotRepository.declineAngebot(entity);
    }

    private fetchDetail(): Promise<any> {
        return this.fetchNachfrage().then(() => {
            return this.fetchAngebot();
        });
    }

    private fetchNachfrage(): Promise<ViewNachfrage> {
        return this.repository.get(this.detailId).then((data: ViewNachfrage) => {
            this.model = data;

            return data;
        });
    }

    private fetchAngebot(): Promise<Array<ViewAngebot>> {
        return this.angebotRepository.getByNachfrage(this.detailId).then((data: Array<ViewAngebot>) => {
            this.data = data;

            return data;
        });
    }
}