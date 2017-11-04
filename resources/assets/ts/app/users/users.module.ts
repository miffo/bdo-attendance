import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {reducers} from "./reducers";

import {UserComponent} from "./containers/user.component";
import {UserListViewComponent} from "./components/user-list-view.component";
import {UserDetailComponent} from "./components/user-detail.component";
import {UserDetailAfkComponent} from "./components/user-detail-afk.component";
import {UserDetailCharactersComponent} from "./components/user-detail-characters.component";
import {UserDetailViewComponent} from "./components/user-detail-view.component";
import {UserListComponent} from "./containers/user-list.component";

import {UserEffect} from "./effects/user";

@NgModule({
    declarations: [
        UserComponent,
        UserDetailComponent,
        UserDetailAfkComponent,
        UserDetailCharactersComponent,
        UserDetailViewComponent,
        UserListComponent,
        UserListViewComponent
    ],
    providers:[],
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