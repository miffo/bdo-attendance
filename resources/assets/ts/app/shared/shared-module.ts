import {NgModule} from "@angular/core";
import {
    MatCardModule, MatTableModule, MatPaginatorModule
} from '@angular/material';

const imports:any[] = [
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
];

const declarations:any[] = [

];

@NgModule({
    declarations:[...declarations],
    imports:[...imports],
    exports:[...imports, ...declarations]
})

export class SharedModule{
}