import {createFeatureSelector, createSelector} from "@ngrx/store";

import * as fromCollection from './collection';
import * as fromEvent from './events';
import * as fromRoot from '../../reducers';

export interface EventsState {
    collection: fromCollection.State;
    events: fromEvent.State;
}

export interface State extends fromRoot.State {
    'events': EventsState;
}

export const reducers = {
    collection: fromCollection.reducer,
    events: fromEvent.reducer,
};

export const getEventsState = createFeatureSelector<EventsState>('events');

export const getEventEntitiesState = createSelector(
    getEventsState,
    state => state.events
);

export const getSelectedEventId = createSelector(
    getEventEntitiesState,
    fromEvent.getSelectedId
);

export const {
    selectIds: getEventIds,
    selectEntities: getEventEntities,
    selectAll: getAllEvents,
    selectTotal: getTotalEvents,
} = fromEvent.adapter.getSelectors(getEventEntitiesState);

export const getSelectedEvent = createSelector(
    getEventEntities,
    getSelectedEventId,
    (entities, selectedId) => {
        return selectedId && entities[selectedId];
    }
);

export const getCollectionState = createSelector(
    getEventsState,
    (state: EventsState) => state.collection
);

export const getCollectionLoaded = createSelector(
    getCollectionState,
    fromCollection.getLoaded
);

export const getCollectionLoading = createSelector(
    getCollectionState,
    fromCollection.getLoading
);

export const getCollectionEventIds = createSelector(
    getCollectionState,
    fromCollection.getIds
);


export const getEventCollection = createSelector(
    getEventEntities,
    getCollectionEventIds,
    (entities, ids) => {
        return ids.map(id => entities[id]);
    }
);

export const isSelectedEventInCollection = createSelector(
    getCollectionEventIds,
    getSelectedEventId,
    (ids, selectedId) => {
        return ids.indexOf(selectedId) > -1;
    }
)
