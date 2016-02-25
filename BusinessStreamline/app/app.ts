import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { ProduktRepository, LoginRepository } from './repository/repository';
import { Produkt, Login } from './models/models';

import { HomeComponent } from './sites/home/home';

import { ExtendedRouterOutlet } from './directives/routerOutlet';

@Component({
    selector: '[data-app]',
    template: '<div class="container"><div data-router-outlet=""></div></div>',
    directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, ExtendedRouterOutlet]
})
@RouteConfig([
        { path: "/home", name: "Home", component: HomeComponent, useAsDefault: true }
])
export class AppComponent {

    public ngOnInit(): void {
        

        var model = new Login();

        model.name = "alice";
        model.password = "alice";

        new LoginRepository().login(model).then((data: Login) => {
            console.log(data);
        });
    }

}