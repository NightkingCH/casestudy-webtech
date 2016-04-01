import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES, FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { MomentLocale } from '../../../constants/constants';
import { DateUtilities } from '../../../utils/utils';
import { PIPES } from '../../../pipes/pipes';
import { Validators as AppValidators } from '../../../validation/validation';

import { UserService } from '../../../services/services';

import { TeilRepository, NachfrageRepository } from '../../../repository/repository';
import { ViewTeil, Nachfrage } from '../../../models/models';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Nachfrage hinzufügen"-Seite dar.
 */
@Component({
    selector: '[data-site-add-nachfrage]',
    templateUrl: 'app/sites/nachfrage/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class NachfrageAddComponent {

    private teilId: number;
    private model: Nachfrage = new Nachfrage();
    private formModel: ControlGroup;
    private data: ViewTeil;

    private currentDateFormat: string = moment.localeData(MomentLocale.GERMAN).longDateFormat("L");

    private repository: TeilRepository = new TeilRepository();
    private nachfrageRepository: NachfrageRepository = new NachfrageRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService, private formBuilder: FormBuilder) {
        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");
        }

        // redirect suppliers. only companies can create a request.
        if (this.userService.isAnbieter()) {
            this.router.navigateByUrl("/nachfrage/" + this.data.offeneNachfrageId);

            return;
        }

        // read the part id to link the request to the corresponding product and part.
        this.teilId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.teilId)) {
            this.router.navigateByUrl("/home");
        }

        this.title.setTitle("Nachfrage | Hinzufügen - BLS");

        this.createModel();
    }

    private createModel(): void {
        this.formModel = this.formBuilder.group({
            anzahl: [0, Validators.compose([Validators.required, AppValidators.greaterThan(0)])],
            liefertermin: [null, Validators.compose([Validators.required, AppValidators.date()])]
        });
    }

    /**
     * Angular2 life cycle event.
     */
    public ngOnInit(): void {
        this.fetchTeil();
    }

    /**
     * Click-Event when the request should be created.
     * @param event button click event.
     */
    public onAdd(event: MouseEvent): void {
        if (this.userService.isAnbieter()) {
            return; // suppliers can't create a request.
        }

        var anzahlControl = this.formModel.controls["anzahl"];
        var lieferterminControl = this.formModel.controls["liefertermin"];

        if (!this.formModel.valid) {
            toastr.error("Ungültige Angaben! Bitte prüfen Sie ihre Eingaben.");

            return;
        }

        if (isNaN(anzahlControl.value)) {
            return; // provided amount isn't a number
        }

        if (parseInt(anzahlControl.value) <= 0) {
            return; // a product consists of more than 0 parts.
        }

        if (lieferterminControl.value == null || lieferterminControl.value == "") {
            return; // due date can't be empty!
        }

        if (!DateUtilities.isValidDate(lieferterminControl.value)) {
            return; // date is not valid => but we need it!
        }

        // prepare the entity
        this.model.teilId = this.teilId;
        this.model.erstelltAm = moment().toDate();
        this.model.anzahl = parseInt(anzahlControl.value);
        this.model.liefertermin = moment(lieferterminControl.value, DateUtilities.RECOGNIZE_FORMAT).toDate(); // we need a valid javascript date object to save the date.

        // save the request.
        this.nachfrageRepository.post(this.userService.firma.firmaId, this.model).then((entity: Nachfrage) => {
            toastr.success("Nachfrage wurde eröffnet.");

            this.router.navigateByUrl("/nachfrage/" + entity.nachfrageId);
        });
    }

    private fetchTeil(): Promise<ViewTeil> {
        return this.repository.get(this.teilId).then((data: ViewTeil) => {
            this.model.anzahl = data.anzahl;
            this.data = data;

            return data;
        });
    }
}