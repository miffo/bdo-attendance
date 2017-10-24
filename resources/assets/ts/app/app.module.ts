//import {crossEnv} from "cross-env";
import {NgModule} from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import {isDevMode} from "@angular/core";
import { AppComponent } from './app.component';

const imports: any[] = [BrowserModule];

@NgModule({
    declarations: [
        AppComponent
    ],
    providers: [],
    imports: [...imports],
    bootstrap: [AppComponent],
})

export class AppModule {
    constructor() {
        console.log(isDevMode());
    }
}