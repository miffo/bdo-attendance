import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";

import {SignUpsDatabase} from "../../shared/components/sign-ups-list.component";
import {EventsDatabase} from "../../shared/components/events-list.component";

import {SignUp} from "../../sign_ups/models/sign_up";
import {Event} from "../../events/models/event";
import {User} from "../models/user";
import {Afk} from "../../afk/models/afk";
import {Character} from "../../characters/models/character";

@Component({
    selector: 'user-detail',
    template: `
<mat-grid-list rows="2" cols="3" rowHeight="400px">
    <mat-grid-tile [rowspan]="2">
        <mat-grid-tile-header>Details</mat-grid-tile-header>
        <user-detail-view [user]="user$ | async"></user-detail-view>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Characters</mat-grid-tile-header>
        <user-detail-characters [database]="charactersDatabase"></user-detail-characters>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Sign Ups</mat-grid-tile-header>
        <sign-ups-list [displayColumns]="signUpsDisplayColumns" [signUpDatabase]="signUpsDatabase"></sign-ups-list>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Attended</mat-grid-tile-header>
        <events-list [displayColumns]="eventsDisplayColumns" [database]="eventsDatabase"></events-list>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Afk</mat-grid-tile-header>
        <user-detail-afk [database]="afkDatabase"></user-detail-afk>
    </mat-grid-tile>
</mat-grid-list>`,
    styles: [``],
})
export class UserDetailComponent implements OnInit, OnDestroy
{
    @Input() user$:Observable<User>;
    signUpsDisplayColumns = ['attending', 'event_name', 'character_name', 'created_at'];
    eventsDisplayColumns = ['event_name', 'event_date'];

    signUpsDatabase:UserSignUpsDatabase;
    eventsDatabase:UserEventsDatabase;
    charactersDatabase:UserCharactersDatabase;
    afkDatabase:UserAfkDatabase;

    constructor() {
        this.signUpsDatabase = new UserSignUpsDatabase();
        this.eventsDatabase = new UserEventsDatabase();
        this.charactersDatabase = new UserCharactersDatabase();
        this.afkDatabase = new UserAfkDatabase();
    }

    ngOnInit(): void {
        this.signUpsDatabase.setData(this.user$);
        this.eventsDatabase.setData(this.user$);
        this.charactersDatabase.setData(this.user$);
        this.afkDatabase.setData(this.user$);
    }

    ngOnDestroy(): void {

    }
}

class UserSignUpsDatabase implements SignUpsDatabase<User>
{
    dataChange:BehaviorSubject<User> = new BehaviorSubject<User>(new User());

    get data():SignUp[] { return this.dataChange.value.sign_ups }

    constructor() {}

    setData(event$: Observable<User>):void {
        event$.subscribe(this.dataChange);
    }
}

export class UserEventsDatabase implements EventsDatabase<User>{
    dataChange:BehaviorSubject<User> = new BehaviorSubject<User>(new User());

    get data():Event[] { return this.dataChange.value.attended_events }

    constructor() {}

    setData(event$: Observable<User>):void {
        event$.subscribe(this.dataChange);
    }
}

export class UserCharactersDatabase {
    dataChange:BehaviorSubject<User> = new BehaviorSubject<User>(new User());

    get data():Character[] { return this.dataChange.value.characters }

    constructor() {}

    setData(event$: Observable<User>):void {
        event$.subscribe(this.dataChange);
    }
}

export class UserAfkDatabase {
    dataChange:BehaviorSubject<User> = new BehaviorSubject<User>(new User());

    get data():Afk[] { return this.dataChange.value.afk }

    constructor() {}

    setData(event$: Observable<User>):void {
        event$.subscribe(this.dataChange);
    }
}
