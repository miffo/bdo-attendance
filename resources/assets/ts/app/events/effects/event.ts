import {Actions, Effect} from "@ngrx/effects";
import {Injectable, Inject} from "@angular/core";
import {Observable} from "rxjs/Observable";

import * as event from "../actions/event";
import {Action} from "@ngrx/store";
import {Http} from "@angular/http";

@Injectable()
export class EventsEffects {
    constructor(@Inject(Actions) private actions$:Actions, @Inject(Http) private http:Http) {

    }

    @Effect()
    selectEvent$:Observable<Action> = this.actions$
        .ofType(event.SELECT)
        .map(action => (action as event.Select).payload)
            .switchMap((payload) => this.http.get(`graphql?query=query {
                    events(id:${payload}){
                        id,
                        event_date,
                        last_sign_up_date,
                        name,
                        description,
                        sign_ups{id,attending,user{id, name},character{id, name},created_at},
                        attendees{id,name},
                        created_at,
                        updated_at,
                    }
                }`)
                .map(response => response.json())
                .map(result => new event.Load({event: result.data.events[0]}))
                .catch((err) => Observable.of(new event.LoadFail(err)))
            );
}
