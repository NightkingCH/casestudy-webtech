import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Typ } from '../models/models';

/**
 * @description Verwaltet den Zugriff auf den Webservice.
 */
export class TypRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_TYP);
    }

    public getAll(): Promise<Array<Typ>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var callUri = this.serviceConfig;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: any) => {
                return data;
            });

        return queryPromise;
    }

    public get(id: number): Promise<Array<Typ>> {
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
            .then((data: Array<Typ>) => {
                return data;
            });

        return queryPromise;
    }
}