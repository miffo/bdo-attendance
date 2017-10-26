import {NgModule} from "@angular/core";
import {MatSidenavModule, MatCardModule} from '@angular/material';

const imports:any[] = [
    MatSidenavModule, MatCardModule
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