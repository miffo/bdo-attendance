import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from "rxjs/Observable";

import {State} from '../../store';
import {Event} from '../../types/event';

@Component({
    selector: 'event-list',
    template: require('./event-list.component.html'),
    styles: [require('./event-list.component.css').toString()]
})

export class EventListComponent {

    public events$: Observable<Event[]>;

    title = 'Event list';


    constructor(private store: Store<State>) {
        this.events$ = store.select(s => s.events);
    }
}
