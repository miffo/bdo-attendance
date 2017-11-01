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
    selectSignup$: Observable<Action> = this.actions$
        .ofType(signUp.SELECT)
        .map(action => (action as signUp.Select).payload)
            .switchMap((payload) => this.http.get(``))
        .map(response => response.json())
        .map(payload => ({type: signUp.LOAD, payload: { sign_up: payload.sign_ups[0]}}));
}