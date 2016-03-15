import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES, FormBuilder, ControlGroup, Validators } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';
import { Validators as AppValidators } from '../../../validation/validation';

import { UserService } from '../../../services/services';

import { ProduktRepository } from '../../../repository/repository';
import { Produkt } from '../../../models/models';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die "Produkt hinzufügen"-Seite dar.
 */
@Component({
    selector: '[data-site-add-produkt]',
    templateUrl: 'app/sites/produkt/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class ProduktAddComponent {

    private model: Produkt = new Produkt();
    private formModel: ControlGroup;

    private repository: ProduktRepository = new ProduktRepository();

    constructor(private router: Router, private title: Title, private userService: UserService, private formBuilder: FormBuilder) {
        this.title.setTitle("Produkt | Hinzufügen - BLS");

        // not logged in users can't do anything!
        if (!this.userService.isLoggedIn()) {
            this.router.navigateByUrl("/home");

            return;
        }

        // suppliers can't add a product
        if (this.userService.isAnbieter()) {
            this.router.navigateByUrl("/home");

            return;
        }

        this.createModel();
    }

    private createModel(): void {
        this.formModel = this.formBuilder.group({
            name: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(40)])]
        });
    }

    public onAdd(event: MouseEvent): void {

        if (this.userService.isAnbieter()) {
            return; // suppliers can't create a product.
        }

        var nameControl = this.formModel.controls["name"];

        if (nameControl.value == "" || nameControl.value == null) {
            return;
        }

        this.model.firmaId = this.userService.firma.firmaId;
        this.model.name = nameControl.value;

        this.repository.post(this.model).then((entity: Produkt) => {
            toastr.success("Produkt wurde erstellt.");

            return this.router.navigateByUrl("/produkt/" + entity.produktId);
        });
    }
}