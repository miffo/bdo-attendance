//import {crossEnv} from "cross-env";

import {NgModule} from "@angular/core";
import {BrowserModule} from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppComponent} from './app.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {EventsModule} from "./events/events.module";
import {AppRoutingModule} from "./app-routing.module";



const imports: any[] = [
    AppRoutingModule,
    BrowserModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    EventsModule
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