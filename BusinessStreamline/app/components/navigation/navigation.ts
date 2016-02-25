import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

@Component({
    selector: '[data-bsl-navigation]',
    templateUrl: 'app/components/navigation/navigation.html',
    directives: [COMMON_DIRECTIVES]
})
export class NavigationComponent {
}