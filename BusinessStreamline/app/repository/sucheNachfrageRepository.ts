import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';
import { Utilities } from '../utils/utilities';

import { NachfrageSearch, ViewSucheNachfrage } from '../models/models';



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
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<ViewSucheNachfrage>) => {
                return data;
            });

        return queryPromise;
    }
}