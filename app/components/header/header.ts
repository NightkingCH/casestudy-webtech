import { Component } from 'angular2/core';

import { SearchComponent } from '../search/search';

@Component({
    selector: '[data-header]',
    directives: [
        SearchComponent
    ],
    template: `
    <div class="header">
        <div data-cmp-search=""></div>
    </div>
    `
})
export class HeaderComponent {
}
