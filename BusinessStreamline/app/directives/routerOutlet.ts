import { Directive, ElementRef, DynamicComponentLoader, Attribute } from 'angular2/core';
import { Router, RouterOutlet } from 'angular2/router';

/**
 * @description Überschreibt den Angular2-Router, da dieser nicht W3-Valid ist.
 */
@Directive({ selector: '[data-router-outlet]' })
export class ExtendedRouterOutlet extends RouterOutlet {
    constructor(_elementRef: ElementRef, _loader: DynamicComponentLoader, _parentRouter: Router, @Attribute('name') nameAttr: string) {
        super(_elementRef, _loader, _parentRouter, nameAttr);
    }
}