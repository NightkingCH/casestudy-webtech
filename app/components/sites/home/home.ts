import { Component } from 'angular2/core';

import { COMPONENTS } from './components/components';

@Component({
    selector: '[data-site-home]',
    directives: [
        COMPONENTS
    ],
    template: `
    <div class="site">
        <div data-cmp-home-landing=""></div>
        <div data-cmp-home-sellers=""></div>
    </div>
    `
})
export class HomeSiteComponent {
}
