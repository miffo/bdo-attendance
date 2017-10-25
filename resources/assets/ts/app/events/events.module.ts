import { NgModule } from "@angular/core";

import { EventDetailComponent } from "./event-detail/event-detail.component";
import { EventListComponent } from "./event-list/event-list.component";

@NgModule({
    providers:[],
    declarations: [
        EventDetailComponent,
        EventListComponent
    ],
    imports:[],
    exports:[]
})

export class EventsModule {}