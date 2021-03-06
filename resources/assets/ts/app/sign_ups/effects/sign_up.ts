import {Inject, Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Actions, Effect} from "@ngrx/effects";
import {Observable} from "rxjs/Observable";
import {Action} from "@ngrx/store";

import * as signUp from "../actions/sign_up";

@Injectable()
export class SignUpEffects {
    constructor(@Inject(Actions) private actions$:Actions, @Inject(Http) private http:Http) {

    }

    @Effect()
    selectSignUp$:Observable<Action> = this.actions$
        .ofType(signUp.SELECT)
        .map(action => (action as signUp.Select).payload)
            .switchMap((payload) => this.http.get(`graphql?query=query{
                        sign_ups(id:${payload}){
                            id,
                            comment,
                            attending,   
                            event{id,name,event_date},
                            user{id,name},
                            character{id,name,level,class_name},
                            created_at,
                            updated_at
                        }
                    }`)
                .map(response => response.json())
                .map(result => new signUp.Load({sign_up: result.data.sign_ups[0]}))
                .catch((err) => Observable.of(new signUp.LoadFail(err)))
            );
}