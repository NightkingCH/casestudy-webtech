import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { UserService } from '../../../services/services';

@Component({
    selector: '[data-site-list-nachfrage]',
    templateUrl: 'app/sites/nachfrage/list/list.html',
    directives: [COMMON_DIRECTIVES]
})
export class NachfrageListComponent {
}