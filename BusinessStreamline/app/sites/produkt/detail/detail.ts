import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { ProduktRepository, TeilRepository } from '../../../repository/repository';
import { Produkt, ViewTeil } from '../../../models/models';

import { UserService } from '../../../services/services';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Produktdetail"-Seite dar.
 */
@Component({
    selector: '[data-site-detail-produkt]',
    templateUrl: 'app/sites/produkt/detail/detail.html',
    directives: [COMMON_DIRECTIVES]
})
export class ProduktDetailComponent {

    private produktId: number;
    private model: Produkt;
    private data: Array<ViewTeil> = [];

    private isOwner: boolean = false;

    private repository: ProduktRepository = new ProduktRepository();
    private teilRepository: TeilRepository = new TeilRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService) {
        // read the id to load the corresponding detail data.
        this.produktId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.produktId)) {
            this.router.navigateByUrl("/home");

            return;
        }

        this.title.setTitle("Produkt " + this.produktId.toString() + " - BLS");
    }

    /**
     * @description
     * Angular2 life cycle event.
     */
    public ngOnInit(): void {
        // get product detail information
        this.repository.get(this.produktId).then((data: Produkt) => {
            this.model = data;
            this.title.setTitle("Produkt | " + this.model.name + " - BLS"); // update title with product name.

            if (!this.userService.isFirma()) {
                return;
            }

            // ui trigger.
            this.isOwner = this.model.firmaId == this.userService.firma.firmaId;

        }).then(() => {
            return this.teilRepository.getByProdukt(this.produktId).then((data: Array<ViewTeil>) => {
                this.data = data;
            });
        }).then(() => {
            this.setUpUI();
        });
    }

    private setUpUI(): void {
        $('[data-toggle="tooltip"]').tooltip();
    }
}