﻿import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { UserService } from '../../services/services';

/**
 * @description Header + Navigationsbar
 */
@Component({
    selector: '[data-bsl-navigation]',
    templateUrl: 'app/components/navigation/navigation.html',
    directives: [COMMON_DIRECTIVES]
})
export class NavigationComponent {

    private isFirma: boolean;
    private isAnbieter: boolean;

    constructor(private userService: UserService) {
    }
    
    public ngDoCheck(): void {
        this.isFirma = this.userService.isFirma();
        this.isAnbieter = this.userService.isAnbieter();
    }
}