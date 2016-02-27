import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { AngebotRepository, NachfrageRepository } from '../../../repository/repository';
import { ViewNachfrage, ViewAngebot } from '../../../models/models';

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

    // inject router to navigate to home after logout;
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

        this.repository.get(this.detailId).then((data: ViewNachfrage) => {
            this.model = data;
        }).then(() => {
            return this.fetchAngebot();
        }).then(() => {
            this.setUpUI();
        });
    }

    private setUpUI(): void {
        $('[data-toggle="tooltip"]').tooltip();
    }

    public onAcceptAngebot(event: MouseEvent, entity: ViewAngebot): void {
        //TODO only accept own offers!
        var offersToDecline = Enumerable.from(this.data).where((x: ViewAngebot) => x.angebotId != entity.angebotId);

        this.acceptAngebot(entity).then(() => {
            // only decline offers if the first has been accepted!
            var promiselist: Array<Promise<ViewAngebot>> = [];

            offersToDecline.forEach((x: ViewAngebot) => {
                promiselist.push(this.declineAngebot(x));
            });

            return Promise.all(promiselist);
        }).then(() => {
            return this.fetchAngebot();
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

    private fetchAngebot(): Promise<Array<ViewAngebot>> {
        return this.angebotRepository.getByNachfrage(this.detailId).then((data: Array<ViewAngebot>) => {
            this.data = data;

            return data;
        });
    }
}