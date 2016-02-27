﻿import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { UserService } from '../../../services/services';

import { ProduktRepository } from '../../../repository/repository';
import { Produkt } from '../../../models/models';

@Component({
    selector: '[data-site-add-produkt]',
    templateUrl: 'app/sites/produkt/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class ProduktAddComponent {

    private model: Produkt = new Produkt();

    private repository: ProduktRepository = new ProduktRepository();

    constructor(private router: Router,  private title: Title, private userService: UserService) {
        this.title.setTitle("Produkt | Hinzufügen - BLS");
    }

    public ngOnInit(): void {
    }

    public onAdd(event: MouseEvent): void {

        // TODO: add when user service is available.
        //if (this.userService.isFirma()) {
        //    return; // companies can't create an offer.
        //}

        this.model.firmaId = 4; // TODO: Add proper user! => this.userService.firma.firmaId;

        this.repository.post(this.model).then((entity: Produkt) => {
            this.router.navigateByUrl("/produkt/" + entity.produktId);
        });
    }
}