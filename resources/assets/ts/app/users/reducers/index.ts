import {createFeatureSelector, createSelector} from "@ngrx/store";

import * as fromRoot from '../../reducers';
import * as fromUser from './user';

export interface UserState extends fromRoot.State {
    users: fromUser.State;
}

export const reducers = {
    users: fromUser.reducer
};

export const getUserState = createFeatureSelector<UserState>('users');

export const getUserEntitiesState = createSelector(
    getUserState,
    state => state.users
);

export const getSelectedUserId = createSelector(
    getUserEntitiesState,
    fromUser.getSelectedId
);

export const {
    selectIds: getUserIds,
    selectEntities: getUserEntities,
    selectAll: getAllUsers,
    selectTotal: getTotalUsers,
} = fromUser.adapter.getSelectors(getUserEntitiesState);

export const getSelectedUser = createSelector(
    getUserEntities,
    getSelectedUserId,
    (entities, selectedId) => selectedId && entities[selectedId]
);
