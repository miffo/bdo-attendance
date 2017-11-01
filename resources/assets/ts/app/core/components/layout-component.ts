import {Component} from "@angular/core";

@Component({
    selector: 'app-layout',
    template: `
<mat-sidenav-container>
    <ng-content></ng-content>
</mat-sidenav-container>`
})
export class LayoutComponent {}