import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { RouteConfig, ROUTER_DIRECTIVES } from 'angular2/router';

import { ExtendedRouterOutlet } from './directives/routerOutlet';

import { ProduktRepository, LoginRepository } from './repository/repository';
import { Produkt, Login } from './models/models';

import { NavigationComponent } from './components/navigation/navigation';

import { HomeComponent } from './sites/home/home';
import { SucheComponent } from './sites/suche/suche';

/* Produkt */
import { ProduktAddComponent } from './sites/produkt/add/add';
import { ProduktDetailComponent } from './sites/produkt/detail/detail';
import { ProduktListComponent } from './sites/produkt/list/list';

/* Nachfrage */
import { NachfrageAddComponent } from './sites/nachfrage/add/add';
import { NachfrageDetailComponent } from './sites/nachfrage/detail/detail';
import { NachfrageListComponent } from './sites/nachfrage/list/list';

´/* Angebot */
import { AngebotAddComponent } from './sites/angebot/add/add';

/* About */
import { AboutComponent } from './sites/about/about';

/* Kontakt */
import { KontaktComponent } from './sites/kontakt/kontakt';

/* Login */
import { LoginComponent } from './sites/login/login';

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
        { path: "/suche", name: "Suche", component: SucheComponent },
        { path: "/produkte", name: "Produkte", component: ProduktListComponent },
        { path: "/produkt/:id", name: "ProduktDetail", component: ProduktDetailComponent },
        { path: "/produkt/add", name: "ProduktAdd", component: ProduktAddComponent },
        { path: "/nachfrage", name: "Nachfrage", component: NachfrageListComponent },
        { path: "/nachfrage/:id", name: "Produkt", component: NachfrageDetailComponent },
        { path: "/nachfrage/add", name: "AddProdukt", component: NachfrageAddComponent },
        { path: "/about", name: "About", component: AboutComponent },
        { path: "/kontakt", name: "Kontakt", component: KontaktComponent },
        { path: "/login", name: "Login", component: LoginComponent },
        { path: "/angebot/add/:id", name: "AddAngebot", component: AngebotAddComponent }
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