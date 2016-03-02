import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Angebot, ViewAngebot } from '../models/models';

/**
 * @description Verwaltet den Zugriff auf den Webservice.
 */
export class AngebotRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_ANGEBOT);
    }

    public get(id: number): Promise<Angebot> {
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
            .then((data: Angebot) => {
                return data;
            });

        return queryPromise;
    }

    public getByNachfrage(nachfrage: number): Promise<Array<ViewAngebot>> {
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
            .then((data: Array<ViewAngebot>) => {
                return (<ExtendedJSON> JSON).restore(data);
            });

        return queryPromise;
    }

    public post(model: Angebot): Promise<Angebot> {

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
            .then((data: Angebot) => {
                return data;
            });

        return queryPromise;
    }

    public acceptAngebot(firmaId: number, model: ViewAngebot): Promise<ViewAngebot> {

        var callConfiguration: RequestInit = {
            method: "post",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(model)
        };

        var callUri = this.serviceConfig + "/accept" + "/" + firmaId;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: ViewAngebot) => {
                return data;
            });

        return queryPromise;
    }

    public declineAngebot(firmaId: number, model: ViewAngebot): Promise<ViewAngebot> {

        var callConfiguration: RequestInit = {
            method: "post",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(model)
        };

        var callUri = this.serviceConfig + "/decline" + "/" + firmaId;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: ViewAngebot) => {
                return data;
            });

        return queryPromise;
    }
}