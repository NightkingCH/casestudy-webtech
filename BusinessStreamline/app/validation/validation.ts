import { GreaterThanValidator } from './greaterThanValidator';

export * from './greaterThanValidator';

export class Validators {
    public static greaterThan(minValue: number): Function {
        return new GreaterThanValidator(minValue).validate;
    };
}
