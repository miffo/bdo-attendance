import 'reflect-metadata';
import 'zone.js';
import 'rxjs';

import {AppModule} from "./app/app.module";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {enableProdMode} from "@angular/core";

/*if (environment.production) {
    enableProdMode();
}*/
//process.env.NODE_ENV;
platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));