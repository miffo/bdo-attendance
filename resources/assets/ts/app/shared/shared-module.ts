import {NgModule} from "@angular/core";
import {
    MatCardModule, MatTableModule, MatPaginatorModule, MatGridListModule
} from '@angular/material';

const imports:any[] = [
    MatCardModule,
    MatGridListModule,
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