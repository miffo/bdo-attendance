import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

import {Event} from "../models/event";
import * as event from "../actions/event";
import * as collection from "../actions/collection";
import {Update} from "@ngrx/entity/src/models";

export interface State extends EntityState<Event> {
    selectedEventId: number | null;
}

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({
    selectId: (event: Event) => event.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedEventId: null
});

export function reducer(state = initialState, action: event.Actions | collection.Actions): State {
    switch (action.type) {
        case collection.LOAD_SUCCESS: {
            return {
                ...adapter.addMany(action.payload.events, state),
                selectedEventId: state.selectedEventId,
            };
        }
        case event.LOAD: {
            let newState:State = {
                ...adapter.addOne(action.payload.event, state),
                selectedEventId: state.selectedEventId,
            };
            return {
                ...adapter.updateOne({id:action.payload.event.id, changes:action.payload.event}, newState),
                selectedEventId: state.selectedEventId,
            };
        }
        case event.SELECT: {
            return {
                ...state,
                selectedEventId: action.payload
            }
        }
        default: {
            return state;
        }
    }
}

export const getSelectedId = (state: State) => state.selectedEventId;