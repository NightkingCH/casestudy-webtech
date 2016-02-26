import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({
    name: 'momentdate'
})
export class MomentDatePipe implements PipeTransform {
    public transform(value: any): any {
        return moment(value).format("L - LTS");
    }
}