import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';

import { ProduktRepository, TeilRepository } from '../../../repository/repository';
import { Produkt, Teil } from '../../../models/models';

@Component({
    selector: '[data-site-detail-product]',
    templateUrl: 'app/sites/produkt/detail/detail.html',
    directives: [COMMON_DIRECTIVES]
})
export class ProduktDetailComponent {

    private detailId: number;
    private model: Produkt;
    private data: Array<Teil> = [];

    private repository: ProduktRepository = new ProduktRepository();
    private teilRepository: TeilRepository = new TeilRepository();

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

        this.repository.get(this.detailId).then((data: Produkt) => {
            this.model = data;
        }).then(() => {
            return this.teilRepository.getByProdukt(this.detailId).then((data: Array<Teil>) => {
                this.data = data;
            });
        });
    }
}