import {RouterModule, Routes} from "@angular/router";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./core/containers/page-not-found.component";
import {NgModule} from "@angular/core";
import {EventsModule} from "./events/events.module";
import {SignUpsModule} from "./sign_ups/sign-ups.module";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'events', loadChildren: () => EventsModule},
    {path: 'signUp', loadChildren: () => SignUpsModule},
    {path: '**', component: PageNotFoundComponent}
];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[
        RouterModule,
    ]
})
export class AppRoutesModule {}