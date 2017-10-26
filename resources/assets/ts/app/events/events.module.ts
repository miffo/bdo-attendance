import { NgModule } from "@angular/core";

import { EventDetailComponent } from "./event-detail/event-detail.component";
import { EventListComponent } from "./event-list/event-list.component";
import {SharedModule} from "../shared/shared-module";

@NgModule({
    providers:[],
    declarations: [
        EventDetailComponent,
        EventListComponent
    ],
    imports:[SharedModule],
    exports:[]
})

export class EventsModule {}