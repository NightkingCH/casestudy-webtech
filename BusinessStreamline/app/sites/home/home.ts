import { Component, ViewChildren, QueryList, ElementRef } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

import { SucheNachfrageRepository } from '../../repository/repository';
import { Nachfrage, Search } from '../../models/models';



@Component({
    selector: '[data-site-home]',
    templateUrl: 'app/sites/home/home.html',
    directives: [COMMON_DIRECTIVES]
})
export class HomeComponent {

    private data: Array<Nachfrage> = [];
    private model: Search = new Search();

    @ViewChildren("dropdown")
    private items: QueryList<ElementRef>

    public ngOnInit(): void {
        new SucheNachfrageRepository().get().then((data: Array<Nachfrage>) => {
            this.data = data;
        });
    }

    public ngAfterViewInit(): void {
        this.items.toArray().forEach((element: ElementRef) => {
            $(element.nativeElement).dropdown();
        });
    }

    public onSubmit(): void {
        console.log(this.model);
    }

}