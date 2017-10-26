import {Injectable} from '@angular/core';
import {Actions, Effect} from "@ngrx/effects";
import * as events from "./actions";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class EventsEffects {
    constructor(private actions$: Actions, private http: HttpClient) {
    }

    @Effect({dispatch:false})
    loadMiners$ = this.actions$
        .ofType(events.ActionTypes.LOAD_ALL)
        .map(() => {
            this.http.get("graphql?query=query{events{id, name, event_date, last_sign_up_date, created_at, updated_at}}").subscribe(data => {
                console.log(data);
            });
        });
}
