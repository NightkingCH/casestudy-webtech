import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';
import { ProduktRepository, LoginRepository } from './repository/repository';
import { Produkt, Login } from './models/models';

import { NavigationComponent } from './components/navigation/navigation';

import { HomeComponent } from './sites/home/home';
import { SucheComponent } from './sites/suche/suche';

import { ExtendedRouterOutlet } from './directives/routerOutlet';

@Component({
    selector: '[data-app]',
    template: `
    <div data-bsl-navigation=""></div>
    <div class="container theme-showcase">
        <div data-router-outlet=""></div>
    </div>
`,
    directives: [COMMON_DIRECTIVES, ROUTER_DIRECTIVES, ExtendedRouterOutlet, NavigationComponent]
})
@RouteConfig([
        { path: "/home", name: "Home", component: HomeComponent, useAsDefault: true },
        { path: "/suche", name: "Suche", component: SucheComponent }
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