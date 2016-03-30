//HACK: https://github.com/angular/angular/issues/5169
interface System {
    register: Function
}

declare var System: System;

// angular2 hotfix
System.register("angular2/src/core/change_detection/pipe_lifecycle_reflector", [], true, function (require, exports, module) {
    exports.implementsOnDestroy = (pipe) => pipe ? pipe.constructor.prototype.ngOnDestroy : false
})

import { bootstrap, BROWSER_PROVIDERS, Title } from 'angular2/platform/browser';
import { bind, enableProdMode } from 'angular2/core';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';

import { AppComponent } from './app';
import { MomentLocale } from './constants/constants';
import { SERVICE_PROVIDERS } from './services/services';

enableProdMode();

moment.locale(MomentLocale.GERMAN); // change language to german

bootstrap(AppComponent,
    [
        ROUTER_PROVIDERS,
        bind(LocationStrategy).toClass(HashLocationStrategy),
        BROWSER_PROVIDERS,
        Title,
        SERVICE_PROVIDERS
    ]);
