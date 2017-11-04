import {Component, Inject} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Store} from "@ngrx/store";

import * as fromAfk from "../reducers";
import * as afk from "../actions/afk";

import {Afk} from "../models/afk";

@Component({
    selector: 'afk-list',
    template: `
<mat-card>
    <mat-card-title>
        Afk
    </mat-card-title>
    <mat-card-content>
        <afk-list-view [afk$]="afk$"></afk-list-view>
    </mat-card-content>
</mat-card>`,
    styles: [`
    `]
})
export class AfkListComponent
{
    public afk$: Observable<Afk[]>;

    constructor(@Inject(Store) private store: Store<fromAfk.AfkState>) {
        this.afk$ = this.store.select(fromAfk.getAllAfk);
    }

    ngOnInit(): void {
        this.store.dispatch(new afk.LoadAll());
    }

    ngOnDestroy(): void {

    }
}