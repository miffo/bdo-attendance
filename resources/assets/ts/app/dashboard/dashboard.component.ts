import { Component } from '@angular/core';


@Component({
    selector: 'dashboard',
    template: require('./dashboard.component.html'),
    styles: [require('./dashboard.component.css').toString()]
})

export class DashboardComponent {
    title = 'Dashboard';
}
