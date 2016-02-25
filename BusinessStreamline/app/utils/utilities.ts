export class Utilities {
    public static isOfType<T extends Function>(obj: any, type: T): obj is T & Function {
        return this instanceof type;
    }
}