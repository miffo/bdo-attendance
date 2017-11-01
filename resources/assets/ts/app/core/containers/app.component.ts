import { Component } from '@angular/core';


@Component({
    selector: 'app-root',
    template: `
<app-layout>
    <app-side-nav>
        Bdo-Attendence
        <app-nav-item routerLink="/dashboard">Dashboard</app-nav-item>
        <app-nav-item routerLink="/events">Events</app-nav-item>
    </app-side-nav>
    <router-outlet></router-outlet>
</app-layout>`
})

export class AppComponent {
    title = 'app';
}
