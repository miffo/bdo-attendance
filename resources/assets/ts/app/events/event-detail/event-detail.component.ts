import { Component } from '@angular/core';


@Component({
    selector: 'event-detail',
    template: require('./event-detail.component.html'),
    styles: [require('./event-detail.component.css').toString()]
})

export class EventDetailComponent {
    title = 'app';
}
