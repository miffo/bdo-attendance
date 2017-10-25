import { Component } from '@angular/core';


@Component({
    selector: 'event-list',
    template: require('./event-list.component.html'),
    styles: [require('./event-list.component.css').toString()]
})

export class EventListComponent {
    title = 'app';
}
