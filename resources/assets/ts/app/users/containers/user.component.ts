import {Component, Inject} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {User} from "../models/user";
import {Store} from "@ngrx/store";
import * as fromUsers from "../reducers";
import * as user from "../actions/user";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'user',
    template:`
<div *ngIf="!(user$ | async)">LOADING</div>
<div *ngIf="(user$ | async)">
    <mat-card>
        <mat-card-title>
            User:
        </mat-card-title>
        <mat-card-content>
            
        </mat-card-content>
    </mat-card>
</div>`,
    styles: [`
    `]
})
export class UserComponent
{
    actionsSubscription: Subscription;
    store: Store<fromUsers.UserState>;
    user$: Observable<User>;

    constructor(@Inject(Store) store: Store<fromUsers.UserState>, @Inject(ActivatedRoute) route: ActivatedRoute) {
        this.store = store;
        this.actionsSubscription = route.params
            .map(params => new user.Select(params.id))
            .subscribe(store);
        this.user$ = store.select(fromUsers.getSelectedUser);
    }

    ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
        this.store.dispatch(new user.UnSelect());
    }
}