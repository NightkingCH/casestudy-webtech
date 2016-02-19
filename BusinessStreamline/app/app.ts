import {Component} from 'angular2/core';
import { ProduktRepository } from './repository/repository';
import { Produkt } from './models/models';

/**
 * Marker interface for all classes that provides repository like functions.
 */
@Component({
    selector: 'app',
    template: '<span>test</span>',
    directives: []
})
export class AppComponent {

    public ngOnInit(): void {
        new ProduktRepository().get(1).then((data: Produkt) => {
            console.log(data.name);
        });
    }

}