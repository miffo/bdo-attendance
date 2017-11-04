import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

import {Event} from "../models/event";
import {User} from "../../users/models/user";
import {SignUp} from "../../sign_ups/models/sign_up";
import {SignUpsDatabase} from "../../shared/components/sign-ups-list.component";

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
        <sign-ups-list [displayColumns]="signUpsDisplayColumns" [signUpDatabase]="signUpsDatabase"></sign-ups-list>
    </mat-grid-tile>    
    <mat-grid-tile>
        <mat-grid-tile-header>Attendees</mat-grid-tile-header>
        <event-detail-attendees [usersDatabase]="usersDatabase"></event-detail-attendees>
    </mat-grid-tile>
</mat-grid-list>`,
    styles: [`
    `]
})

export class EventDetailComponent implements OnInit, OnDestroy
{
    @Input() event$:Observable<Event>;
    @Input() isEventInCollection:boolean;

    signUpsDisplayColumns = ['attending', 'user_name', 'created_at'];

    usersDatabase = new EventUsersDatabase();
    signUpsDatabase = new EventSignUpsDatabase();

    ngOnInit(): void {
        this.usersDatabase.setData(this.event$);
        this.signUpsDatabase.setData(this.event$);
    }

    ngOnDestroy(): void {
    }
}

export class EventUsersDatabase
{
    dataChange:BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event());

    get data():User[] { return this.dataChange.value.attendees; }

    constructor() {}

    setData(event$:Observable<Event>): void {
        event$.subscribe(this.dataChange);
    }
}

export class EventSignUpsDatabase implements SignUpsDatabase<Event>
{
    dataChange:BehaviorSubject<Event> = new BehaviorSubject<Event>(new Event());

    get data():SignUp[] { return this.dataChange.value.sign_ups }

    constructor() {}

    setData(event$:Observable<Event>):void {
        event$.subscribe(this.dataChange);
    }
}