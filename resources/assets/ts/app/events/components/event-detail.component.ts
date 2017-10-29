import {Component, Inject, Input} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import * as fromEvents from "../reducers";
import * as collection from "../actions/collection";

import {Event} from "../models/event";

@Component({
    selector: 'event-detail',
    template: `
        <mat-grid-list cols="2">
            <mat-grid-tile [rowspan]="2">
                <mat-grid-tile-header>Details</mat-grid-tile-header>
                <event-detail-view [event]="event"></event-detail-view>
            </mat-grid-tile>
            <mat-grid-tile>
                <mat-grid-tile-header>Signups</mat-grid-tile-header>
                <event-detail-sign-ups [signUps]="event.sign_ups"></event-detail-sign-ups>
            </mat-grid-tile>
            <mat-grid-tile>
                <mat-grid-tile-header>Attendees</mat-grid-tile-header>
                <event-detail-attendees [attendees]="event.attendees"></event-detail-attendees>
            </mat-grid-tile>
        </mat-grid-list>
    `,
    styles: [`
    `]
})

export class EventDetailComponent {
    @Input() event: Event;
    @Input() isEventInCollection: boolean;

    constructor(@Inject(Store) store: Store<fromEvents.State>) {
    }
}
