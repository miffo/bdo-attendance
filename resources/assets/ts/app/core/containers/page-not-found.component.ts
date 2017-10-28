import { Component } from '@angular/core';


@Component({
    selector: 'page-not-found',
    template: `
<mat-card>
    <mat-card-title>
        404: Not Found
    </mat-card-title>
    <mat-card-content>
        <p>Yerrp this page doesnt exist.</p>
    </mat-card-content>
    <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/">Go Back</button>
    </mat-card-actions>
</mat-card>`,
    styles: [`
:host {
    text-align: center;
}`,
    ]
})

export class PageNotFoundComponent {
    title = 'app';
}
