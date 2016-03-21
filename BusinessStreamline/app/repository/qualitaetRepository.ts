import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Qualitaet } from '../models/models';

/**
 * @description Verwaltet den Zugriff auf den Webservice.
 */
export class QualitaetRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_QUALITAET);
    }

    public getAll(): Promise<Array<Qualitaet>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Qualitaete': "application/json"
            }
        };

        var callUri = this.serviceConfig;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: any) => {
                return data;
            });

        return queryPromise;
    }

    public get(id: number): Promise<Array<Qualitaet>> {
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Qualitaete': "application/json"
            }
        };

        var callUri = this.serviceConfig + "/" + id;

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<Qualitaet>) => {
                return data;
            });

        return queryPromise;
    }
}