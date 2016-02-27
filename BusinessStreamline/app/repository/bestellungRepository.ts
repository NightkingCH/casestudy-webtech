import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Bestellung } from '../models/models';

export class BestellungRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_BESTELLUNG);
    }

    public get(id: number): Promise<Bestellung> {
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
            .then((data: Bestellung) => {
                return data;
            });

        return queryPromise;
    }

    public getByNachfrage(nachfrage: number): Promise<Array<Bestellung>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/nachfrage/" + nachfrage;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<Bestellung>) => {
                return (<ExtendedJSON> JSON).restore(data);
            });

        return queryPromise;
    }

    public getByAngebot(nachfrage: number): Promise<Array<Bestellung>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/angebit/" + nachfrage;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<Bestellung>) => {
                return (<ExtendedJSON>JSON).restore(data);
            });

        return queryPromise;
    }

    public post(model: Bestellung): Promise<Bestellung> {

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
            .then((data: Bestellung) => {
                return data;
            });

        return queryPromise;
    }
}