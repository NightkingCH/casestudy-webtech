import { Component } from 'angular2/core';

@Component({
    selector: '[data-cmp-home-landing]',
    template: `
    <div class="cmp">
        <div class="row">
            <div class="col-md-6">
                <img class="center-block img-thumbnail" alt="placeholder" src="https://placeimg.com/400/400/people/sepia" />
            </div>
            <div class="col-md-6">
                <div class="row">
                    <div class="col-md-12">
                        <img style="margin-bottom: 20px" class="center-block img-thumbnail" alt="placeholder" src="https://placeimg.com/200/200/people/sepia" />
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <img alt="placeholder" class="center-block img-thumbnail" src="https://placeimg.com/200/200/tech/sepia" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
})
export class LandingComponent {
}
