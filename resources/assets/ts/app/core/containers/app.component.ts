import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    template: `
<app-layout>
    <app-side-nav>
        Bdo-Attendence
        <app-nav-item routerLink="/dashboard">Dashboard</app-nav-item>
        <app-nav-item routerLink="/events">Events</app-nav-item>
        <app-nav-item routerLink="/afk">Afk</app-nav-item>
        <app-nav-item routerLink="/users">Users</app-nav-item>
    </app-side-nav>
    <router-outlet></router-outlet>
</app-layout>`,
    styles: [``]
})

export class AppComponent {
    title = 'app';
}
