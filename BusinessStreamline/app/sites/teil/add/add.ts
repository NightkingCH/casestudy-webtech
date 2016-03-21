import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES, FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';
import { Validators as AppValidators } from '../../../validation/validation';

import { UserService } from '../../../services/services';

import { TeilRepository, ProduktRepository, TypRepository, QualitaetRepository } from '../../../repository/repository';
import { Teil, Produkt, Typ, Qualitaet } from '../../../models/models';

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
    private formModel: ControlGroup;
    private data: Produkt;
    private typList: Array<Typ> = [];
    private qualitaetList: Array<Qualitaet> = [];

    private repository: TeilRepository = new TeilRepository();
    private typRepository: TypRepository = new TypRepository();
    private qualitaetRepository: QualitaetRepository = new QualitaetRepository();
    private produktRepository: ProduktRepository = new ProduktRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService, private formBuilder: FormBuilder) {
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

        this.createModel();
    }

    private createModel(): void {
        this.formModel = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])],
            typId: [0, Validators.compose([Validators.required, AppValidators.greaterThan(0)])],
            qualitaetId: [0, Validators.compose([Validators.required, AppValidators.greaterThan(0)])],
            anzahl: [0, Validators.compose([Validators.required, AppValidators.greaterThan(0)])]
        });
    }

    public ngOnInit(): void {

        var lookupPromise = [this.fetchTyp(), this.fetchQualitaet()];

        // load lookup list.
        Promise.all(lookupPromise).then(() => {
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

            nulloTyp.name = "Typ auswählen";
            nulloTyp.typId = 0;

            this.typList = [nulloTyp].concat(data);
        });
    }

    private fetchQualitaet(): Promise<void> {
        return this.qualitaetRepository.getAll().then((data: Array<Qualitaet>) => {

            // add a selection element to the top.
            var nulloTyp = new Qualitaet();

            nulloTyp.name = "Qualität auswählen";
            nulloTyp.qualitaetId = 0;

            this.qualitaetList = [nulloTyp].concat(data);
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


    /**
     * Temporary IE-fix.
     */
    public onQualitaetChange(event: Event): void {

        if (!event) {
            return;
        }

        var selectElement = (<HTMLSelectElement>event.target);

        if (isNaN(parseInt(selectElement.value))) {
            return;
        }

        this.model.qualitaetId = parseInt(selectElement.value);
    }

    public onAdd(event: MouseEvent): void {

        var nameControl = this.formModel.controls["name"];
        var anzahlControl = this.formModel.controls["anzahl"];

        if (nameControl.value == "") {
            return; // part requires a name
        }

        if (isNaN(this.model.typId)) {
            return; // part requires a type
        }

        if (isNaN(this.model.qualitaetId)) {
            return; // part requires a type
        }

        if (isNaN(anzahlControl.value)) {
            return; // part amount from which of the product consists is not a number
        }

        if (parseInt(anzahlControl.value) <= 0) {
            return; // part amount from which of the product consists must be higher than 0
        }

        // link the part to the product
        this.model.produktId = this.produktId;
        this.model.name = nameControl.value;
        this.model.anzahl = parseInt(anzahlControl.value);

        // save the part
        this.repository.post(this.userService.firma.firmaId, this.model).then(() => {
            toastr.success("Teil wurde hinzugefügt.");

            return this.router.navigateByUrl("/produkt/" + this.produktId);
        });
    }
}