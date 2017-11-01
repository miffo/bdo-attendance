import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {SignUpComponent} from "./containers/sign-up.component";
import {SignUpDetailComponent} from "./components/sign-up-detail.component";

import {reducers} from "./reducers";
import {SignUpEffects} from "./effects/sign_up";

@NgModule({
    providers:[],
    declarations: [
        SignUpComponent,
        SignUpDetailComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        SharedModule,
        StoreModule.forFeature('sign_ups', reducers),
        EffectsModule.forFeature([SignUpEffects]),
        RouterModule.forChild([
            {path: ':id', component: SignUpComponent},
        ])
    ],
    exports:[]
})
export class SignUpsModule {}