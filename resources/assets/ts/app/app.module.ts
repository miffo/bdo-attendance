//import {crossEnv} from "cross-env";

import {NgModule} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {AppRoutingModule} from "./app-routing.module";
import {EventsModule} from "./events/events.module";
import {SharedModule} from "./shared/shared-module";
import {StoreModule} from '@ngrx/store';
import {reducer} from "./store/";



const imports: any[] = [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    EventsModule,
    SharedModule,
    StoreModule.forRoot(reducer),
];

@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        PageNotFoundComponent
    ],
    providers: [],
    imports: [...imports],
    bootstrap: [AppComponent],
})

export class AppModule {
    constructor() {
    }
}