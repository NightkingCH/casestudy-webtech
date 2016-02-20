import { Component } from 'angular2/core';
import { ProduktRepository, LoginRepository } from './repository/repository';
import { Produkt, Login } from './models/models';

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

        var model = new Login();

        model.name = "alice";
        model.password = "alice";

        new LoginRepository().login(model).then((data: Login) => {
            console.log(data);
        });
    }

}