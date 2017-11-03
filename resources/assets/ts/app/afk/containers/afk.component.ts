import {Component, Inject} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";
import {ActivatedRoute} from "@angular/router";

import * as fromAfk from "../reducers";
import * as afk from "../actions/afk";

import {Afk} from "../models/afk";

@Component({
    selector: 'afk',
    template: `
<div *ngIf="!(afk$ | async)">LOADING</div>
<div *ngIf="(afk$ | async)">
    <mat-card>
        <mat-card-title>
            Afk:
        </mat-card-title>
        <mat-card-content>

        </mat-card-content>
    </mat-card>
</div>`,
    styles: [`
    `]
})
export class AfkComponent
{
    actionsSubscription: Subscription;
    store: Store<fromAfk.AfkState>;
    afk$: Observable<Afk>;

    constructor(@Inject(Store) store: Store<fromAfk.AfkState>, @Inject(ActivatedRoute) route: ActivatedRoute) {
        this.store = store;
        this.actionsSubscription = route.params
            .map(params => new afk.Select(params.id))
            .subscribe(store);
        this.afk$ = store.select(fromAfk.getSelectedAfk);
    }

    ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
        this.store.dispatch(new afk.UnSelect());
    }
}