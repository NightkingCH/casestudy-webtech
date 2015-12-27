import { Component } from 'angular2/core';

@Component({
    selector: '[data-cmp-search]',
    template: `
    <div class="cmp">
        <div id="search">
            <div class="input-group">
                <input type="text" class="form-control input-lg" placeholder="Search">
                <span class="input-group-btn">
                <button class="btn btn-lg" type="button">
                    <i class="fa fa-search"></i>
                </button>
                </span>
            </div>
        </div>
    </div>
    `
})
export class SearchComponent {
}
