import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import {Injectable, Inject} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {defer} from 'rxjs/observable/defer';
import {of} from 'rxjs/observable/of';

import * as collection from '../actions/collection';
import {Event} from '../models/event';

@Injectable()
export class CollectionEffects {
    constructor(@Inject(Actions) private actions$: Actions, @Inject(Http) private http: Http) {}

    /*
    @Effect()
    LoadCollection$: Observable<any> = defer(() => {
        this.http.get("graphql?query=query{events{id, name, event_date, last_sign_up_date, created_at, updated_at}}")
            .map(res => res.json())
            .map(payload => ({type: collection.LOAD_SUCCESS, payload}))
            .subscribe(action => this.)
    });
    */

    @Effect()
    loadCollection$: Observable<Action> = this.actions$
        .ofType(collection.LOAD)
        .switchMap(() => this.http.get("graphql?query=query{events{id, name, event_date, last_sign_up_date, created_at, updated_at}}")
            .map(response => response.json())
            .map(payload => ({type: collection.LOAD_SUCCESS, payload: payload.data.events})));

    /*
    @Effect()
    loadCollection$: Observable<Action> = this.actions$
        .ofType(collection.LOAD)
        .switchMap(() =>
            this.db
                .query('books')
                .toArray()
                .map((books: Book[]) => new collection.LoadSuccess(books))
                .catch(error => of(new collection.LoadFail(error)))
        );
    */
}
