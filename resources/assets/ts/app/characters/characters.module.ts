import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {reducers} from "./reducers";

@NgModule({
    providers:[],
    declarations: [
    ],
    imports:[
        CommonModule,
        RouterModule,
        SharedModule,
        StoreModule.forFeature('characters', reducers),
        EffectsModule.forFeature([])
    ],
    exports:[]
})
export class CharactersModule {}