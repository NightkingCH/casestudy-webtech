import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Angebot, ViewAngebot } from '../models/models';

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
}