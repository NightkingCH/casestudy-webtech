import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { SucheNachfrageRepository } from '../../repository/repository';
import { Nachfrage } from '../../models/models';



@Component({
    selector: 'site-home',
    templateUrl: 'app/sites/home/home.html',
    directives: [COMMON_DIRECTIVES]
})
export class HomeComponent {

    private data: Array<Nachfrage> = [];

    public ngOnInit(): void {
        new SucheNachfrageRepository().get().then((data: Array<Nachfrage>) => {
            this.data = data;
        });
    }

}