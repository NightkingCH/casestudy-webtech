import { Directive, ElementRef, DynamicComponentLoader, Attribute } from 'angular2/core';
import { Router, RouterOutlet } from 'angular2/router';

/**
 * A router outlet is a placeholder that Angular dynamically fills based on the application's route.
 *
 * ## Use
 *
 * ```
 * <router-outlet></router-outlet>
 * ```
 */
@Directive({ selector: '[data-router-outlet]' })
export class ExtendedRouterOutlet extends RouterOutlet {
    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
    }
}