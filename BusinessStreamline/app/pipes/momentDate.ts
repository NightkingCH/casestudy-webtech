import {Pipe, PipeTransform} from 'angular2/core';

/**
 * @description Formatiert ein Datumsobjekt oder ein Datums-String in ein länderspezifisches Format.
 * @remark L-LTS => Beispiel => 21.03.2014 - 22:30
 */
@Pipe({
    name: 'momentdate'
})
export class MomentDatePipe implements PipeTransform {
    public transform(value: any, args: string[]): any {
        var format = "L - LTS";

        if (args != null && args.length > 0) {
            format = args[0];
        }

        return moment(value).format(format);
    }
}