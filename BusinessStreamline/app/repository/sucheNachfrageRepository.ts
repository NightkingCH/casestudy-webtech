import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { NachfrageSearch, ViewSucheNachfrage } from '../models/models';

/**
 * @description Verwaltet den Zugriff auf den Webservice.
 */
export class SucheNachfrageRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_SEARCH_NACHFRAGE);
    }

    public get(src: NachfrageSearch): Promise<Array<ViewSucheNachfrage>> {
        
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/" + JSON.stringify(src);

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<ViewSucheNachfrage>) => {
                return data;
            });

        return queryPromise;
    }

    public count(src: NachfrageSearch): Promise<number> {

        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/count/" + JSON.stringify(src);

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: number) => {
                if (isNaN(data)) {
                    return 0;
                }

                return data;
            });

        return queryPromise;
    }
}