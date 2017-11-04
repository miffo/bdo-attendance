import {Component, OnInit, Inject} from '@angular/core';
import {Observable} from "rxjs/Observable";

import {Store} from "@ngrx/store";

import * as fromEvents from "../reducers";
import * as collection from "../actions/collection";
import {Event} from "../models/event";

@Component({
    selector: 'event-list-container',
    template: `
<mat-card>
    <mat-card-title>
        Events
    </mat-card-title>
    <mat-card-content>
        <event-list-view [events$]="events$"></event-list-view>
    </mat-card-content>
</mat-card>`,
    styles: [`
    `]
})

export class EventListComponent implements OnInit
{
    public events$:Observable<Event[]>;

    constructor(@Inject(Store) private store:Store<fromEvents.State>) {
        this.events$ = this.store.select(fromEvents.getEventCollection);
    }

    ngOnInit(): void {
        this.store.dispatch(new collection.Load());
    }
}
