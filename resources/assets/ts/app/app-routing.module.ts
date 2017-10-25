import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventListComponent} from "./events/event-list/event-list.component";
import {EventDetailComponent} from "./events/event-detail/event-detail.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const appRoutes: Routes = [
    { path: '', redirectTo: "/dashboard", pathMatch:'full'},
    { path: 'dashboard', component: DashboardComponent, data:{title: "Coming events"}},
    { path: 'eventList', component: EventListComponent, data:{title: "List of all events"}},
    { path: 'event/:id', component: EventDetailComponent},
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