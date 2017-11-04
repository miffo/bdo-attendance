import {Component, Inject} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Subscription, Observable} from "rxjs";
import {Store} from "@ngrx/store";

import * as fromCharacter from "../reducers";
import * as character from "../actions/character";

import {Character} from "../models/character";

@Component({
    selector: 'character',
    template: `
<div *ngIf="!(character$ | async)">LOADING</div>
<div *ngIf="(character$ | async)">
    <mat-card>
        <mat-card-title>
            {{(character$ | async).name}}
        </mat-card-title>
        <mat-card-content>
            <character-detail [character]="character$ | async"></character-detail>
        </mat-card-content>
    </mat-card>
</div>`,
    styles: [``]
})
export class CharacterComponent
{
    actionsSubscription: Subscription;
    store: Store<fromCharacter.CharacterState>;
    character$: Observable<Character>;

    constructor(@Inject(Store) store: Store<fromCharacter.CharacterState>, @Inject(ActivatedRoute) route: ActivatedRoute) {
        this.store = store;
        this.actionsSubscription = route.params
            .map(params => new character.Select(params.id))
            .subscribe(store);
        this.character$ = store.select(fromCharacter.getSelectedCharacter);
    }

    ngOnDestroy(): void {
        this.actionsSubscription.unsubscribe();
        this.store.dispatch(new character.UnSelect());
    }
}