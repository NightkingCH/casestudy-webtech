﻿import { Component } from 'angular2/core';
import { COMMON_DIRECTIVES } from 'angular2/common';

@Component({
    selector: '[data-site-about]',
    templateUrl: 'app/sites/about/about.html',
    directives: [COMMON_DIRECTIVES]
})
export class AboutComponent { }