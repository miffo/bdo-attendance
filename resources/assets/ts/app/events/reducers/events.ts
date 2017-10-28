import {createEntityAdapter, EntityAdapter, EntityState} from "@ngrx/entity";

import {Event} from "../models/event";
import * as event from "../actions/event";
import * as collection from "../actions/collection";

export interface State extends EntityState<Event> {
    selectedEventId: number | null;
}

export const adapter: EntityAdapter<Event> = createEntityAdapter<Event>({
    selectId: (event: Event)  => event.id,
    sortComparer: false
});

export const initialState: State = adapter.getInitialState({
    selectedEventId: null
});

export function reducer(state = initialState, action: event.Actions | collection.Actions): State {
    switch (action.type) {
        case collection.LOAD_SUCCESS: {
            return {
                ...adapter.addMany(action.payload, state),
                selectedEventId: state.selectedEventId,
            };
        }
        case event.LOAD: {
            return {
                ...adapter.addOne(action.payload, state),
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