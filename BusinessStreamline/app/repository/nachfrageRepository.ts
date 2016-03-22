import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { ViewNachfrage, Nachfrage } from '../models/models';

/**
 * @description Verwaltet den Zugriff auf den Webservice.
 */
export class NachfrageRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_NACHFRAGE);
    }

    public get(id: number): Promise<ViewNachfrage> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/" + id;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: ViewNachfrage) => {
                return data;
            });

        return queryPromise;
    }

    public getByFirma(firma: number, login: number): Promise<Array<ViewNachfrage>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/firma/" + firma + "/login/" + login;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<ViewNachfrage>) => {
                return data;
            });

        return queryPromise;
    }

    public post(firmaId:number, model: Nachfrage): Promise<Nachfrage> {

        var callConfiguration: RequestInit = {
            method: "post",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(model)
        };

        var callUri = this.serviceConfig + "/" + firmaId;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Nachfrage) => {
                return data;
            });

        return queryPromise;
    }
}