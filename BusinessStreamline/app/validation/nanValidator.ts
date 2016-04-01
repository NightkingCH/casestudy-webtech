import { Control, Validator } from 'angular2/common';

export class NaNValidator implements Validator {
    constructor() {
    }

    public validate(c: Control): { [key: string]: any } {
        // use required if not nullable!
        if (c.value == null) {
            return null;
        }
        
        if (!isNaN(c.value)) {
            return null;
        }

        return { nan: true };
    }
}
