import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { UserService } from '../../../services/services';

import { TeilRepository, ProduktRepository, TypRepository } from '../../../repository/repository';
import { Teil, Produkt, Typ } from '../../../models/models';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Teil hinzufügen"-Seite dar.
 */
@Component({
    selector: '[data-site-add-teil]',
    templateUrl: 'app/sites/teil/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class TeilAddComponent {

    private produktId: number;
    private model: Teil = new Teil();
    private data: Produkt;
    private typList: Array<Typ> = [];

    private repository: TeilRepository = new TeilRepository();
    private typRepository: TypRepository = new TypRepository();
    private produktRepository: ProduktRepository = new ProduktRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService) {
        this.title.setTitle("Teil | Hinzufügen - BLS");

        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // redirect suppliers to home => they can't add a new part!
        if (this.userService.isAnbieter()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // read the product id to link the part to the corresponding product.
        this.produktId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.produktId)) {
            this.router.navigateByUrl("/home");

            return;
        }
    }

    public ngOnInit(): void {
        // load lookup list.
        this.fetchTyp().then(() => {
            // load product details
            return this.fetchProdukt().then(() => {
                // redirect the company if they don't own the product
                if (this.data.firmaId != this.userService.firma.firmaId) {
                    return this.router.navigateByUrl("/produkt/" + this.produktId);
                }
            });
        });
    }

    private fetchTyp(): Promise<void> {
        return this.typRepository.getAll().then((data: Array<Typ>) => {

            // add a selection element to the top.
            var nulloTyp = new Typ();

            nulloTyp.name = "Typ Auswählen";
            nulloTyp.typId = 0;

            this.typList = [nulloTyp].concat(data);
        });
    }

    private fetchProdukt(): Promise<void> {
        return this.produktRepository.get(this.produktId).then((data: Produkt) => {
            this.data = data;
        });
    }

    /**
     * Temporary IE-fix.
     */
    public onTypChange(event: Event): void {

        if (!event) {
            return;
        }

        var selectElement = (<HTMLSelectElement>event.target);

        if (isNaN(parseInt(selectElement.value))) {
            return;
        }

        this.model.typId = parseInt(selectElement.value);
    }

    public onAdd(event: MouseEvent): void {

        if (this.model.name == "") {
            return; // part requires a name
        }

        if (this.model.typId <= 0) {
            return; // part requires a type
        }

        if (isNaN(this.model.anzahl)) {
            return; // part amount from which of the product consists is not a number
        }

        if (this.model.anzahl <= 0) {
            return; // part amount from which of the product consists must be higher than 0
        }

        // link the part to the product
        this.model.produktId = this.produktId;

        // save the part
        this.repository.post(this.userService.firma.firmaId, this.model).then(() => {
            toastr.success("Teil wurde hinzugefügt.");

            return this.router.navigateByUrl("/produkt/" + this.produktId);
        });
    }
}