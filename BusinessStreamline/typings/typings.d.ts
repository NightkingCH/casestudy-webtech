/// <reference path="browser.d.ts" />
/// <reference path="../node_modules/angular2/typings/browser.d.ts"/>
/// <reference path="../node_modules/reflect-metadata/reflect-metadata.d.ts" />
/// <reference path="linqjs/linq.d.ts" />

declare interface ExtendedJSON extends JSON {
    restore(g: any): any;
}