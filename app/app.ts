import { Component } from 'angular2/core';
import { RouteConfig, Router, ROUTER_DIRECTIVES } from 'angular2/router';

import { COMPONENTS } from './components/components';
import { HomeSiteComponent } from './components/sites/sites';

@Component({
    selector: '[data-app]',
    directives: [
        COMPONENTS,
        ROUTER_DIRECTIVES
    ],
    template: `
    <div data-cmp-navigation=""></div>
    <div class="container">
        <div data-header=""></div>
        <router-outlet></router-outlet>
    </div>
    <div data-footer=""></div>
    `
})
@RouteConfig([
     { path:'/home', name: 'Home', component: HomeSiteComponent, useAsDefault: true }
])
export class AppComponent {
}
