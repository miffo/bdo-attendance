import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {
    MatCardModule, MatTableModule, MatPaginatorModule, MatGridListModule, MatTooltipModule
} from '@angular/material';
import {SignUpsListComponent} from "./components/sign-ups-list.component";

const imports:any[] = [
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatTooltipModule,
    RouterModule
];

const declarations:any[] = [
    SignUpsListComponent
];

@NgModule({
    declarations:[...declarations],
    imports:[...imports],
    exports:[...imports, ...declarations]
})

export class SharedModule{
}