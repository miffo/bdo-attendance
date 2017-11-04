import {Component, Input} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {SignUpsDatabase} from "../../shared/components/sign-ups-list.component";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {SignUp} from "../../sign_ups/models/sign_up";

@Component({
    selector: 'user-detail',
    template: `
<mat-grid-list rows="1" cols="4" rowHeight="400px">
    <mat-grid-tile>
        <mat-grid-tile-header>Details</mat-grid-tile-header>
        <user-detail-view [user]="user$ | async"></user-detail-view>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Sign Ups</mat-grid-tile-header>
        <sign-ups-list [displayColumns]="signUpsDisplayColumns" [signUpDatabase]="signUpsDatabase"></sign-ups-list>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Attended</mat-grid-tile-header>
        <user-detail-attendees [usersDatabase]="eventDatabase"></user-detail-attendees>
    </mat-grid-tile>
    <mat-grid-tile>
        <mat-grid-tile-header>Afk</mat-grid-tile-header>
        <user-detail-attendees [usersDatabase]="afkDatabase"></user-detail-attendees>
    </mat-grid-tile>
</mat-grid-list>`,
    styles: [``],
})
export class UserDetailComponent
{
    @Input() user$:Observable<User>;
    signUpsDisplayColumns = ['attending', 'event_name', 'character_name', 'created_at'];

    signUpsDatabase:UserSignUpsDatabase
}

export class UserSignUpsDatabase implements SignUpsDatabase<User>
{
    dataChange: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

    get data(): SignUp[] { return this.dataChange.value.sign_ups }

    constructor() {}

    setData(event$: Observable<User>):void {
        event$.subscribe(this.dataChange);
    }
}