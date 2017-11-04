import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {reducers} from "./reducers";
import {UserComponent} from "./containers/user.component";
import {UserListComponent} from "./containers/user-list.component";
import {UserEffect} from "./effects/user";
import {UserListViewComponent} from "./components/user-list-view.component";

@NgModule({
    providers:[],
    declarations: [
        UserComponent,
        UserListComponent,
        UserListViewComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        StoreModule.forFeature('users', reducers),
        EffectsModule.forFeature([UserEffect]),
        RouterModule.forChild([
            {path: ':id', component: UserComponent},
            {path: '', component: UserListComponent}
        ])
    ],
    exports:[]
})
export class UsersModule {}