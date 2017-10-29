import {Component, Inject, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";

import * as fromEvents from "../reducers";
import * as event from "../actions/event";

import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";

import {Event} from '../models/event';

@Component({
    selector: 'event',
    template: `
<mat-card>
    <mat-card-title>
        {{(event$ | async).name}}
    </mat-card-title>
    <mat-card-content>
        <div *ngIf="!event$ | async">LOADING</div>
        <event-detail
                *ngIf="event$ | async"
                [event$]="event$"
                [isEventInCollection]="isSelectedEventInCollection$ | async" >

        </event-detail>
    </mat-card-content>
    <mat-card-actions>
    </mat-card-actions>
</mat-card>
    `,
    styles: [`
    `
    ]
})
export class EventComponent implements OnDestroy
{
    event$: Observable<Event>;
    isSelectedEventInCollection$: Observable<boolean>;
    actionsSubscription: Subscription;

    constructor(@Inject(Store) store: Store<fromEvents.State>, @Inject(ActivatedRoute) route: ActivatedRoute) {
        this.actionsSubscription = route.params
            .map(params => new event.Select(params.id))
            .subscribe(store);
        this.event$ = store.select(fromEvents.getSelectedEvent);
        this.isSelectedEventInCollection$ = store.select(fromEvents.isSelectedEventInCollection);
    }

    ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
    }
}
