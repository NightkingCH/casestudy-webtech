import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Teil, ViewTeil } from '../models/models';

/**
 * @description Verwaltet den Zugriff auf den Webservice.
 */
export class TeilRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_TEIL);
    }

    public get(id: number): Promise<ViewTeil> {
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
            .then((data: ViewTeil) => {
                return data;
            });

        return queryPromise;
    }

    public post(firmaId: number, model: Teil): Promise<Teil> {

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
            .then((data: Teil) => {
                return data;
            });

        return queryPromise;
    }

    public getByProdukt(produkt: number): Promise<Array<ViewTeil>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/produkt/" + produkt;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<ViewTeil>) => {
                return (<ExtendedJSON> JSON).restore(data);
            });

        return queryPromise;
    }
}