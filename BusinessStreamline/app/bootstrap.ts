import { bootstrap, BROWSER_PROVIDERS, Title } from 'angular2/platform/browser';
import { bind, enableProdMode } from 'angular2/core';
import { ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy } from 'angular2/router';

import { AppComponent } from './app';
import { SERVICE_PROVIDERS } from './services/services';

enableProdMode();

bootstrap(AppComponent,
    [
        ROUTER_PROVIDERS,
        bind(LocationStrategy).toClass(HashLocationStrategy),
        BROWSER_PROVIDERS,
        Title,
        SERVICE_PROVIDERS
    ]);
