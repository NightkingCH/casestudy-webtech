import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

@Component({
    selector: '[data-site-kontakt]',
    templateUrl: 'app/sites/kontakt/kontakt.html',
    directives: [COMMON_DIRECTIVES]
})
export class KontaktComponent {
    constructor(private title: Title) {
        this.title.setTitle("Kontakt - BLS");
    }
}