import {Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

import * as afk from "../actions/afk";

export class AfkEffects {
    constructor(@Inject(Actions) private actions$:Actions, @Inject(Http) private http:Http) {}

    @Effect()
    afkLoadAll$: Observable<Action> = this.actions$
        .ofType(afk.LOAD_ALL)
        .switchMap(() => this.http.get(`graphql?query=query{
                        afk{
                            id,
                            user{id, name},
                            reason,
                            from_date,
                            to_date,
                            created_at,
                            updated_at
                        }
                    }`)
            .map(response => response.json())
            .map(result => new afk.LoadAllSuccess({afk: result.data.afk}))
            .catch(err => Observable.of(new afk.LoadAllFail(err)))
        );

    @Effect()
    afkSelect$: Observable<Action> = this.actions$
        .ofType(afk.SELECT)
        .map((action) => (action as afk.Select).payload)
            .switchMap(payload => this.http.get(`graphql?query=query{
                        afk{
                            id,
                            user{id, name},
                            events{id, name},
                            reason,
                            from_date,
                            to_date,
                            created_at,
                            updated_at
                        }
                    }`)
                .map(response => response.json())
                .map(result => new afk.Load(result.data.afk[0]))
                .catch(err => Observable.of(new afk.LoadFail(err)))
            );
}