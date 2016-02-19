import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';

export class ProduktRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_PRODUKT);
    }

    public get(id: number): Promise<any> {
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
            .then((data: any) => {
                return data;
            });

        return queryPromise;
    }
}