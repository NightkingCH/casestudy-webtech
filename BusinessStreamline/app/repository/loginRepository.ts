﻿import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';
import { Login } from '../models/models';

/**
 * @description Verwaltet den Zugriff auf den Webservice.
 */
export class LoginRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_LOGIN);
    }

    public login(model: Login): Promise<Login> {

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
            .then((data: Login) => {
                return (<ExtendedJSON> JSON).restore(data);
            });

        return queryPromise;
    }
}
