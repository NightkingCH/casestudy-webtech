import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES, FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';
import { Validators as AppValidators } from '../../../validation/validation';

import { UserService } from '../../../services/services';

import { AngebotRepository, NachfrageRepository } from '../../../repository/repository';
import { ViewNachfrage, Angebot } from '../../../models/models';

@Component({
    selector: '[data-site-add-angebot]',
    templateUrl: 'app/sites/angebot/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class AngebotAddComponent {

    private nachfrageId: number;
    private model: Angebot = new Angebot();
    private formModel: ControlGroup;
    private data: ViewNachfrage;

    private repository: NachfrageRepository = new NachfrageRepository();
    private angebotRepository: AngebotRepository = new AngebotRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService, private formBuilder: FormBuilder) {
        this.title.setTitle("Angebot | Hinzufügen - BLS");

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

        // companies can't add an offer.
        if (this.userService.isFirma()) {
            this.router.navigateByUrl("/nachfrage/" + this.nachfrageId);

            return;
        }

        this.createModel();
    }

    private createModel(): void {
        this.formModel = this.formBuilder.group({
            preisProTeil: [0, Validators.compose([Validators.required, AppValidators.greaterThan(0.01)])]
        });
    }

    public ngOnInit(): void {
        if (isNaN(this.nachfrageId)) {
            return;
        }

        this.fetchAngebot();
    }

    public onAdd(event: MouseEvent): void {

        if (this.userService.isFirma()) {
            return; // companies can't create an offer.
        }

        var preisProTeilControl = this.formModel.controls["preisProTeil"];

        if (!this.formModel.valid) {
            toastr.error("Ungültige Angaben! Bitte prüfen Sie ihre Eingaben.");

            return;
        }

        if (isNaN(preisProTeilControl.value)) {
            return; // provided amount isn't a number
        }

        if (parseInt(preisProTeilControl.value) <= 0) {
            return; // a product consists of more than 0 parts.
        }

        this.model.nachfrageId = this.nachfrageId;
        this.model.anbieterId = this.userService.anbieter.anbieterId;
        this.model.preisProTeil = parseFloat(preisProTeilControl.value)
        this.model.erstelltAm = moment().toDate();
        this.model.status = 0; // 0 = Offen, 1 = Akzeptiert, 2 = Geschlossen

        this.angebotRepository.post(this.model).then(() => {
            toastr.success("Angebot wurde abgegeben.");

            this.router.navigateByUrl("/nachfrage/" + this.nachfrageId);
        });
    }

    private fetchAngebot(): Promise<void> {
        return this.repository.get(this.nachfrageId).then((data: ViewNachfrage) => {
            this.data = data;
        });
    }
}