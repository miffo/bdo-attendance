import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {reducers} from "./reducers";
import {AfkEffects} from "./effects/afk";

import {AfkComponent} from "./containers/afk.component";
import {AfkListComponent} from "./containers/afk-list.component";
import {AfkListViewComponent} from "./components/afk-list-view.component";

@NgModule({
    providers:[],
    declarations: [
        AfkComponent,
        AfkListComponent,
        AfkListViewComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        SharedModule,
        StoreModule.forFeature('afk', reducers),
        EffectsModule.forFeature([AfkEffects]),
        RouterModule.forChild([
            {path: ':id', component: AfkComponent},
            {path: '', component: AfkListComponent}
        ])
    ],
    exports:[]
})
export class AfkModule {}