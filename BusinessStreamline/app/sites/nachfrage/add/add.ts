import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

@Component({
    selector: '[data-site-add-nachfrage]',
    templateUrl: 'app/sites/nachfrage/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class NachfrageAddComponent {

    private detailId: number;

    // inject router to navigate to home after logout;
    constructor(private router: Router, private params: RouteParams, private title: Title) {
        this.title.setTitle("Nachfrage | Hinzufügen - BLS");
    }
}