﻿import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';

declare var $: JQueryStatic;

import { AngebotRepository, NachfrageRepository } from '../../../repository/repository';
import { Nachfrage, ViewAngebot } from '../../../models/models';

@Component({
    selector: '[data-site-detail-nachfrage]',
    templateUrl: 'app/sites/nachfrage/detail/detail.html',
    directives: [COMMON_DIRECTIVES]
})
export class NachfrageDetailComponent {

    private detailId: number;
    private model: Nachfrage;
    private data: Array<ViewAngebot> = [];

    private repository: NachfrageRepository = new NachfrageRepository();
    private teilRepository: AngebotRepository = new AngebotRepository();

    // inject router to navigate to home after logout;
    constructor(private router: Router, private params: RouteParams) {
        this.detailId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.detailId)) {
            router.navigateByUrl("/home");
        }
    }

    public ngOnInit(): void {
        if (isNaN(this.detailId)) {
            return;
        }

        this.repository.get(this.detailId).then((data: Nachfrage) => {
            this.model = data;
        }).then(() => {
            return this.teilRepository.getByNachfrage(this.detailId).then((data: Array<ViewAngebot>) => {
                this.data = data;
            });
        }).then(() => {
            this.setUpUI();
        });
    }

    private setUpUI(): void {
        $('[data-toggle="tooltip"]').tooltip();
    }

    public onAcceptAngebot(event: MouseEvent, entity: ViewAngebot): void {
    }

    public onDeclineAngebot(): void {
        alert("Nicht implementiert :)");
    }
}