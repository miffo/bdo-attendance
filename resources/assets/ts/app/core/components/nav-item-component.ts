import {Component} from "@angular/core";

@Component({
    'selector': 'app-nav-item',
    'template': `
    <a mat-list-item [routerLink]="routerLink">
        <span mat-line><ng-content></ng-content></span>
    </a>
`,
    'styles': [`
    
    `]
})
export class NavItemComponent {}