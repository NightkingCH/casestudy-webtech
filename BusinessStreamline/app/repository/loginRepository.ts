import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';
import { Login } from '../models/models';

export class LoginRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_LOGIN);
    }

    public login(model: Login): Promise<any> {

        var callConfiguration: RequestInit = {
            method: "post",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(model)
        };

        var queryPromise = window.fetch(this.serviceConfig, callConfiguration)
            .then(this.parseResponse)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: any) => {
                return data;
            });

        return queryPromise;
    }
}