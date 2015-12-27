import { Component } from 'angular2/core';

@Component({
    selector: '[data-cmp-navigation]',
    template: `
    <div class="navbar navbar-default">
        <div class="container">
            <ul class="nav navbar-nav">
                <li>
                    <a href="#"><span>Startseite</span></a>
                </li>
                <li>
                    <a href="#"><span>Über uns</span></a>
                </li>
                <li>
                    <a href="#"><span>Kontakt</span></a>
                </li>
                <li>
                    <a href="#"><span>Impressum</span></a>
                </li>
            </ul>
        </div>
    </div>
    `
})
export class NavigationComponent {
}
