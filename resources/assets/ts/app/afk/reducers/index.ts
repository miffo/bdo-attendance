import * as fromRoot from '../../reducers';
import * as fromAfk from "./afk";
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface AfkState extends fromRoot.State {
    'afk': fromAfk.State;
}

export const reducers = {
    afk: fromAfk.reducer
};

export const getAfkState = createFeatureSelector<AfkState>("afk");

export const getAfkEntitiesState = createSelector(
    getAfkState,
    state => state.afk
);

export const getSelectedAfkId = createSelector(
    getAfkEntitiesState,
    fromAfk.getSelectedAfkId
);

export const {
    selectIds: getAfkIds,
    selectEntities: getAfkEntities,
    selectAll: getAllAfk,
    selectTotal: getTotalAfk,
} = fromAfk.adapter.getSelectors(getAfkEntitiesState);

export const getSelectedAfk = createSelector(
    getAfkEntities,
    getSelectedAfkId,
    (entities, selectedId) => selectedId && entities[selectedId]
);