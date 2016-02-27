import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';
import { Router, RouteParams } from 'angular2/router';
import { Title } from 'angular2/platform/browser';

declare var $: JQueryStatic;

import { PIPES } from '../../../pipes/pipes';

import { UserService } from '../../../services/services';

import { TeilRepository, ProduktRepository, TypRepository } from '../../../repository/repository';
import { Teil, Produkt, Typ } from '../../../models/models';

@Component({
    selector: '[data-site-add-teil]',
    templateUrl: 'app/sites/teil/add/add.html',
    directives: [COMMON_DIRECTIVES],
    pipes: [PIPES]
})
export class TeilAddComponent {

    private produktId: number;
    private model: Teil = new Teil();
    private data: Produkt;
    private typList: Array<Typ> = [];

    private repository: TeilRepository = new TeilRepository();
    private typRepository: TypRepository = new TypRepository();
    private produktRepository: ProduktRepository = new ProduktRepository();

    constructor(private router: Router, private params: RouteParams, private title: Title, private userService: UserService) {
        this.produktId = parseInt(params.params["id"]);

        // redirect trolls to home!
        if (isNaN(this.produktId)) {
            router.navigateByUrl("/home");
        }

        this.title.setTitle("Teil | Hinzufügen - BLS");
    }

    public ngOnInit(): void {
        if (isNaN(this.produktId)) {
            return;
        }

        this.fetchTyp().then(() => {
            return this.fetchProdukt();
        });
    }

    private fetchTyp(): Promise<void> {
        return this.typRepository.getAll().then((data: Array<Typ>) => {

            // add a selection element to the top.
            var nulloTyp = new Typ();

            nulloTyp.name = "Typ Auswählen";
            nulloTyp.typId = 0;

            this.typList = [nulloTyp].concat(data);
        });
    }

    private fetchProdukt(): Promise<void> {
        return this.produktRepository.get(this.produktId).then((data: Produkt) => {
            this.data = data;
        });
    }

    public onAdd(event: MouseEvent): void {

        if (this.model.name == "") {
            return;
        }

        if (this.model.typId <= 0) {
            return;
        }

        if (this.model.anzahl <= 0) {
            return;
        }

        this.model.produktId = this.produktId;

        this.repository.post(this.model).then(() => {
            this.router.navigateByUrl("/produkt/" + this.produktId);
        });
    }
}