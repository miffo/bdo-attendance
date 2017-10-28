import {Actions, Effect} from "@ngrx/effects";
import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs/Observable";

import * as event from "../actions/event";
import {Action} from "@ngrx/store";
import {Http} from "@angular/http";

@Injectable()
export class EventsEffects {
    constructor(@Inject(Actions) private actions$: Actions, @Inject(Http) private http: Http) {

    }

    @Effect()
    selectEvent$: Observable<Action> = this.actions$
        .ofType(event.SELECT)
        .switchMap((payload) => this.http.get(`graphql?query=query{events(id=${payload}){id, name, event_date, last_sign_up_date, created_at, updated_at}}`)
            .map(response => response.json())
            .map(payload => ({type: event.LOAD, payload: payload.data.events})));
}
