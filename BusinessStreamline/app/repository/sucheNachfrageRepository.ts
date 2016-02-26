import { EndpointConfiguration } from '../configuration/endpoints';
import { Repository } from './baseRepository';
import { Utilities } from '../utils/utilities';

import { Search, SucheNachfrage } from '../models/models';



export class SucheNachfrageRepository extends Repository {

    constructor() {
        super(EndpointConfiguration.WEB_API_HOST + EndpointConfiguration.WEB_API_SEARCH_NACHFRAGE);
    }

    public get(src: string = "", page: number = 0, typ: number = 0, take: number = 10): Promise<Array<SucheNachfrage>> {
        
        var callConfiguration: RequestInit = {
            method: "get",
            headers: {
                'Accept': "application/json",
                'Content-Type': "application/json"
            }
        };

        var srcParam = new Search();

        srcParam.search = src;
        srcParam.page = page || 0;
        srcParam.typ = typ || 0;
        srcParam.take = take || 10;

        var callUri = this.serviceConfig + "/" + JSON.stringify(srcParam);

        var queryPromise = window.fetch(callUri, callConfiguration)
            .then(this.parseText)
            .then(this.parseJson)
            .then((data: Array<Nachfrage>) => {
                return data;
            });

        return queryPromise;
    }
}