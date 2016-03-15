import { Control, Validator } from 'angular2/common';

export class GreaterThanValidator implements Validator {
    constructor(private minValue: number) {
    }

    public validate: (c: Control) => { [key: string]: any } = (c: Control) => {
        // use required if not nullable!
        if (c.value == null) {
            return null;
        }

        var internalValue = parseFloat(c.value);

        if (isNaN(internalValue)) {
            return { invalidNotGreaterThan: true }
        }

        if (internalValue > this.minValue) {
            return null;
        }

        return { invalidNotGreaterThan: true };
    }
}
