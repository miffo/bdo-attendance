import {Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Actions, Effect} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import * as fromCharacter from "../actions/character";

export class CharacterEffect {
    constructor(@Inject(Actions) private actions$:Actions, @Inject(Http) private http:Http) {}

    @Effect()
    LoadCharacter$:Observable<Action> = this.actions$
        .ofType(fromCharacter.SELECT)
        .map(action => (action as fromCharacter.Select).payload)
            .switchMap((payload) => this.http.get(`graphql?query=query{
                        sign_ups(){
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
                .map(result => new fromCharacter.Load(result.data.character[0]))
                .catch(err => Observable.of(new fromCharacter.LoadFail(err)))
            );
}