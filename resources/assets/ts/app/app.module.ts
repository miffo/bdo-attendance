import {isDevMode, NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StoreModule} from '@ngrx/store';
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from "@angular/common";
import {MatSidenavModule} from "@angular/material";

import {EffectsModule} from "@ngrx/effects";

import {StoreDevtoolsModule} from "@ngrx/store-devtools";

import {SharedModule} from "./shared/shared-module";
import {CoreModule} from "./core/core-module";
import {EventsModule} from "./events/events.module";
import {AppRoutesModule} from "./app.routes.module";


import {reducers, metaReducers} from './reducers';

import {DashboardComponent} from "./dashboard/dashboard.component";
import {AppComponent} from './core/containers/app.component';
import {HttpModule} from "@angular/http";

const imports: any[] = [
    CommonModule,
    AppRoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    EventsModule,
    MatSidenavModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    isDevMode()?StoreDevtoolsModule.instrument({maxAge: 50}):[]

];

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    providers: [],
    imports: [...imports],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {
    }
}