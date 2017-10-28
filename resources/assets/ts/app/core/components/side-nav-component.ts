import {Component} from "@angular/core";

@Component({
    'selector': 'app-side-nav',
    'template': `
    <mat-sidenav mode="side" opened="true" disableClose>
        <mat-nav-list>
            <ng-content></ng-content>
        </mat-nav-list>
    </mat-sidenav>
`,
    'styles': [`
    `]
})
export class SideNavComponent {}