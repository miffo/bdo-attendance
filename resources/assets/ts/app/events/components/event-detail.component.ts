import {Component, Inject, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import * as fromEvents from "../reducers";

import {Event} from "../models/event";

@Component({
    selector: 'event-detail',
    template: `
<mat-grid-list rows="1" cols="3" rowHeight="400px">
    <mat-grid-tile>
        <mat-grid-tile-header>Details</mat-grid-tile-header>
        <event-detail-view [event]="event$ | async"></event-detail-view>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Sign Ups</mat-grid-tile-header>
        <event-detail-sign-ups [event$]="event$"></event-detail-sign-ups>
    </mat-grid-tile>    
    <mat-grid-tile>
        <mat-grid-tile-header>Attendees</mat-grid-tile-header>
        <event-detail-attendees [event$]="event$"></event-detail-attendees>
    </mat-grid-tile>
</mat-grid-list>`,
    styles: [`
    `]
})

export class EventDetailComponent {
    @Input() event$: Observable<Event>;
    @Input() isEventInCollection: boolean;

    constructor(@Inject(Store) store: Store<fromEvents.State>) {
    }
}
