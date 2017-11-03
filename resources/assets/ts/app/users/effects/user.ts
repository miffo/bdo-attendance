import {Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

import * as user from "../actions/user";

export class UserEffect {
    constructor(@Inject(Actions) private actions$:Actions, @Inject(Http) private http:Http) {}

    @Effect()
    selectUser$: Observable<Action> = this.actions$
        .ofType(user.SELECT)
        .map(action => (action as user.Select).payload)
            .switchMap(payload => this.http.get(`graphql?query=query{
                    sign_ups(id:${payload}){
                        comment,
                        attending,   
                        event{id,name},
                        user{id,name},
                        character{id,name,class_name},
                        created_at,
                        updated_at,
                    }
                }`)
                .map(response => response.json())
                .map(result => (new user.Load({user:result.data.users[0]})))
                .catch((err) => Observable.of(new user.LoadFail(err)))
            );

    @Effect()
    LoadAllUsers: Observable<Action> = this.actions$
        .ofType(user.LOAD_ALL)
        .switchMap(() => this.http.get(`graphql?query=query{
                sign_ups{
                    comment,
                    attending,   
                    event{id,name},
                    user{id,name},
                    character{id,name,class_name},
                    created_at,
                    updated_at,
                }
            }`)
            .map(response => response.json())
            .map(result => (new user.LoadAllSuccess(result.data)))
            .catch((err) => Observable.of(new user.LoadAllFail(err)))
        );
}