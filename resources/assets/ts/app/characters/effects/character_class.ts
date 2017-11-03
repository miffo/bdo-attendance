import {Inject} from "@angular/core";
import {Http} from "@angular/http";
import {Actions, Effect} from "@ngrx/effects";
import {Action} from "@ngrx/store";
import {Observable} from "rxjs/Observable";

import * as fromCharacterClass from "../actions/character_class";

export class CharacterClassEffect {
    constructor(@Inject(Actions) private actions$:Actions, @Inject(Http) private http:Http) {}

    @Effect()
    LoadCharacterClass$:Observable<Action> = this.actions$
        .ofType(fromCharacterClass.LOAD)
        .switchMap(() => this.http.get(`graphql?query=query{character_classes{id,name}}`)
            .map(response => response.json())
            .map(result => new fromCharacterClass.LoadSuccess(result.data))
            .catch(err => Observable.of(new fromCharacterClass.LoadFail(err)))
        );
}