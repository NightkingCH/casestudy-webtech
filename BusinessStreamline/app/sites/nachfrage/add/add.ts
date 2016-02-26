import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

@Component({
    selector: '[data-site-add-nachfrage]',
    templateUrl: 'app/sites/nachfrage/add/add.html',
    directives: [COMMON_DIRECTIVES]
})
export class NachfrageAddComponent {
    constructor(private title: Title) {
        this.title.setTitle("Nachfrage | Hinzufügen - BLS");
    }
}