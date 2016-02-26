import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

import { Nachfrage } from '../models/models';

export class NachfrageRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_NACHFRAGE);
    }

    public get(id: number): Promise<Nachfrage> {
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
            .then((data: Nachfrage) => {
                return data;
            });

        return queryPromise;
    }

    public getByFirma(firma: number, login: number): Promise<Array<Nachfrage>> {
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
            .then((data: Array<Nachfrage>) => {
                return data;
            });

        return queryPromise;
    }
}