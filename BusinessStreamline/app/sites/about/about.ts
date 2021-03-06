﻿import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Title } from 'angular2/platform/browser';

/**
 * @description
 * Angular2-Komponente. Erweckt das HTML-Template zum Leben.
 * Stellt die Über-Uns-Seite dar.
 */
@Component({
    selector: '[data-site-about]',
    templateUrl: 'app/sites/about/about.html',
    directives: [COMMON_DIRECTIVES]
})
export class AboutComponent {
    constructor(private title: Title) {
        this.title.setTitle("Über Uns - BLS");
    }
}