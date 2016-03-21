import { GreaterThanValidator } from './greaterThanValidator';
import { DateValidator } from './dateValidator';

export * from './greaterThanValidator';
export * from './dateValidator';

export class Validators {
    public static greaterThan(minValue: number): Function {
        return new GreaterThanValidator(minValue).validate;
    };

    public static date(): Function {
        return new DateValidator().validate;
    };
}
