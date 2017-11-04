import {NgModule} from "@angular/core";
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

import {SharedModule} from "../shared/shared-module";

import {CollectionEffects} from "./effects/collection";
import {EventsEffects} from "./effects/event";

import {EventComponent} from "./containers/event.component";
import {EventListComponent} from "./containers/event-list.component";
import {EventListViewComponent} from "./components/event-list-view.component";
import {EventDetailComponent} from "./components/event-detail.component";
import {EventDetailViewComponent} from "./components/event-detail-view.component";
import {EventDetailAttendeesComponent} from "./components/event-detail-attendees.component";

import {reducers} from "./reducers";

@NgModule({
    imports:[
        CommonModule,
        SharedModule,
        StoreModule.forFeature('events', reducers),
        EffectsModule.forFeature([CollectionEffects, EventsEffects]),
        RouterModule.forChild([
            {path: ':id', component: EventComponent},
            {path: '', component: EventListComponent}
        ])
    ],
    providers:[],
    declarations: [
        EventComponent,
        EventListComponent,
        EventListViewComponent,
        EventDetailComponent,
        EventDetailAttendeesComponent,
        EventDetailViewComponent
    ],
    exports:[]
})
export class EventsModule {}