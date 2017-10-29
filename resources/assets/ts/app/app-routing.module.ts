import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventComponent} from "./events/containers/event.component";
import {PageNotFoundComponent} from "./core/containers/page-not-found.component";
import {EventListComponent} from "./events/containers/event-list.component";

const appRoutes: Routes = [
    { path: '', redirectTo: "/dashboard", pathMatch:'full'},
    { path: 'dashboard', component: DashboardComponent, data:{title: "Coming events"}},
    { path: 'eventList', component: EventListComponent, data:{title: "List of all events"}},
    { path: 'event/:id', component: EventComponent},
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes, {enableTracing:true}
        ),
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}