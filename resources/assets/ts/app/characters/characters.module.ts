import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {CharacterComponent} from "./containers/character.component";
import {CharacterDetailComponent} from "./components/character-detail.component";

import {CharacterClassEffect} from "./effects/character_class";
import {CharacterEffect} from "./effects/character";

import {reducers} from "./reducers";

@NgModule({
    providers:[],
    declarations: [
        CharacterComponent,
        CharacterDetailComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        SharedModule,
        StoreModule.forFeature('characters', reducers),
        EffectsModule.forFeature([CharacterClassEffect, CharacterEffect]),
        RouterModule.forChild([
            {path: ':id', component: CharacterComponent},
        ])
    ],
    exports:[]
})
export class CharactersModule {}