import { Component } from '@angular/core';


@Component({
    selector: 'page-not-found',
    template: require('./page-not-found.component.html'),
    styles: [require('./page-not-found.component.css').toString()]
})

export class PageNotFoundComponent {
    title = 'app';
}
