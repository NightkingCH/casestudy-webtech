import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Produkt } from '../models/models';

export class ProduktRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_PRODUKT);
    }

    public get(id: number): Promise<Produkt> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/" + id;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Produkt) => {
                return data;
            });

        return queryPromise;
    }

    public post(model: Produkt): Promise<Produkt> {

        var callConfiguration: RequestInit = {
            method: "post",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(model)
        };

        var callUri = this.serviceConfig;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Produkt) => {
                return data;
            });

        return queryPromise;
    }

    public getByFirma(firma: number, login: number): Promise<Array<Produkt>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/firma/" + firma + "/login/" + login;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<Produkt>) => {
                return data;
            });

        return queryPromise;
    }
}