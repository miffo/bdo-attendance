import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {EventDetailComponent} from "./events/containers/event-detail/event-detail.component";
import {PageNotFoundComponent} from "./core/containers/page-not-found.component";
import {EventListContainerComponent} from "./events/containers/event-list-container.component";

const appRoutes: Routes = [
    { path: '', redirectTo: "/dashboard", pathMatch:'full'},
    { path: 'dashboard', component: DashboardComponent, data:{title: "Coming events"}},
    { path: 'eventList', component: EventListContainerComponent, data:{title: "List of all events"}},
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