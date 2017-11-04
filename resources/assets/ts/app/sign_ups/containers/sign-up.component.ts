import {Component, Inject, OnDestroy} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs/Subscription";

import * as fromSignUps from "../reducers";
import * as signUps from "../actions/sign_up";

import {SignUp} from "../models/sign_up";

@Component({
    selector:'sign-up-container',
    template:`
<div *ngIf="!(signUp$ | async)">LOADING</div>
<div *ngIf="(signUp$ | async)">
    <mat-card>
        <mat-card-title>
            Sign up for {{(signUp$ | async).event.name}}
        </mat-card-title>
        <mat-card-content>
            <sign-up-detail [signUp]="signUp$ | async"></sign-up-detail>
        </mat-card-content>
        <mat-card-actions>
        </mat-card-actions>
    </mat-card>
</div>`,
    styles: [`
    `]
})
export class SignUpComponent implements OnDestroy {

    signUp$: Observable<SignUp>;
    actionsSubscription: Subscription;
    private store: Store<fromSignUps.SignUpsState>;

    constructor(@Inject(Store) store: Store<fromSignUps.SignUpsState>, @Inject(ActivatedRoute) route: ActivatedRoute) {
        this.store = store;
        this.actionsSubscription = route.params
            .map(params => new signUps.Select(params.id))
            .subscribe(store);
        this.signUp$ = store.select(fromSignUps.getSignUpEntity);
    }

    ngOnDestroy() {
        this.store.dispatch({type: signUps.UNSELECT});
        this.actionsSubscription.unsubscribe();
    }
}