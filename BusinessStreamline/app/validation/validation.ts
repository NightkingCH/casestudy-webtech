import { GreaterThanValidator } from './greaterThanValidator';
import { NaNValidator } from './nanValidator';
import { DateValidator } from './dateValidator';

export * from './greaterThanValidator';
export * from './nanValidator';
export * from './dateValidator';

export class Validators {
    public static greaterThan(minValue: number): Function {
        return new GreaterThanValidator(minValue).validate;
    };

    public static date(): Function {
        return new DateValidator().validate;
    };

    public static nan(): Function {
        return new NaNValidator().validate;
    };
}
