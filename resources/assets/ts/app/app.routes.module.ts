import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";

import {DashboardComponent} from "./dashboard/dashboard.component";
import {PageNotFoundComponent} from "./core/containers/page-not-found.component";

import {AfkModule} from "./afk/afk.module";
import {CharactersModule} from "./characters/characters.module";
import {EventsModule} from "./events/events.module";
import {SignUpsModule} from "./sign_ups/sign-ups.module";
import {UsersModule} from "./users/users.module";

const routes: Routes = [
    {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {path: 'dashboard', component: DashboardComponent},
    {path: 'afk', loadChildren: () => AfkModule},
    {path: 'characters', loadChildren: () => CharactersModule},
    {path: 'events', loadChildren: () => EventsModule},
    {path: 'signUps', loadChildren: () => SignUpsModule},
    {path: 'users', loadChildren: () => UsersModule},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[
        RouterModule,
    ]
})
export class AppRoutesModule {}