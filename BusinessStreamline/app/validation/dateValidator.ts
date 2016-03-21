import { Control, Validator } from 'angular2/common';

import { DateUtilities } from '../utils/utils';

export class DateValidator implements Validator {
    constructor() {
    }

    public validate(c: Control): { [key: string]: any } {
        // use required if not nullable!
        if (c.value == null) {
            return null;
        }

        if (DateUtilities.isValidDate(c.value)) {
            return null;
        }

        return { date: true };
    }
}
