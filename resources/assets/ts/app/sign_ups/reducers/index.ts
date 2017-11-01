import {createFeatureSelector, createSelector} from "@ngrx/store";

import * as fromSignUps from "./sign_up";
import * as fromRoot from '../../reducers';

export interface State extends fromRoot.State {
    sign_ups: fromSignUps.State;
}

export const reducers = {
    sign_ups: fromSignUps.reducer
};

export const getSignUpsState = createFeatureSelector<State>('sign_ups');

export const getSignUpEntityState = createSelector(
    getSignUpsState,
    state => state.sign_ups
);

export const getSignUpEntity = createSelector(
    getSignUpEntityState,
    (state) => {
        return !!state.sign_up && state.sign_up;
    }
);