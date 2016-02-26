import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

@Component({
    selector: '[data-site-add-produkt]',
    templateUrl: 'app/sites/produkt/add/add.html',
    directives: [COMMON_DIRECTIVES]
})
export class ProduktAddComponent {
    constructor(private title: Title) {
        this.title.setTitle("Produkt | Hinzufügen - BLS");
    }
}