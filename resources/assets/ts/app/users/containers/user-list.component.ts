import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";

import * as fromUsers from "../reducers";
import * as user from "../actions/user";
import {User} from "../models/user";

@Component({
    selector: 'user-list-container',
    template: `
<mat-card>
    <mat-card-title>
        Users
    </mat-card-title>
    <mat-card-content>
        <user-list-view [users$]="users$"></user-list-view>
    </mat-card-content>
</mat-card>`,
    styles: [`
    `]
})
export class UserListComponent implements OnInit, OnDestroy
{
    public users$: Observable<User[]>;

    constructor(@Inject(Store) private store: Store<fromUsers.UserState>) {
        this.users$ = this.store.select(fromUsers.getAllUsers);
    }

    ngOnInit(): void {
        this.store.dispatch(new user.LoadAll());
    }

    ngOnDestroy(): void {

    }
}