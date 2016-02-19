/**
 * Marker interface for all classes that provides repository like functions.
 */
export interface IRepository {
}

/**
 * Provides base functionality to all repository like classes for parsing an api response.
 * @remark credentials: (<any>"include"), //include => cookies are send in a cors request | same-origin => only to current domain
 * @link https://github.com/github/fetch
 */
export class Repository {

    constructor(protected serviceConfig: string) {
    }

    /**
     * Checks the http status code.
     * @returns original api response
     */
    protected parseResponse(response: Response): any {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }

        if (!response) {
            var error = new Error("empty response");
            console.error(error);

            return null;
        }

        return response.json().then((data: any) => {
            console.error(response.statusText);
            console.error(response);

            if (!data) {
                return;
            }

            var ex = data;
            console.error(ex);

            var error: any = new Error(ex.message);

            error.exception = ex;
            error.status = response.status;
            error.type = ex.exceptionType;

            throw error;
        });
    }

    /**
     * Transforms the response to a parsable string.
     * @returns responseText
     */
    protected parseText(response: Response): Promise<string> {
        if (!response) {
            return null;
        }

        return response.text();
    }

    /**
     * Creates a object out of the response text.
     * @returns json parsed object.
     */
    protected parseJson(text: string): any {
        if (!text) {
            return null;
        }

        return JSON.parse(text);
    }
}
