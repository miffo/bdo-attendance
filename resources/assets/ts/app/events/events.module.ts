import {NgModule} from "@angular/core";
import {StoreModule} from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {CollectionEffects} from "./effects/collection";
import {EventsEffects} from "./effects/event";

import {EventListContainerComponent} from "./containers/event-list-container.component";
import {EventDetailComponent} from "./containers/event-detail/event-detail.component";
import {EventListComponent} from "./components/event-list.component";
import {EventListRowComponent} from "./components/event-list-row.component";

import {reducers} from "./reducers";

@NgModule({
    providers:[],
    declarations: [
        EventListContainerComponent,
        EventListComponent,
        EventListRowComponent,
        EventDetailComponent
    ],
    imports:[
        CommonModule,
        SharedModule,
        StoreModule.forFeature('events', reducers),
        EffectsModule.forFeature([CollectionEffects, EventsEffects])
    ],
    exports:[]
})
export class EventsModule {}