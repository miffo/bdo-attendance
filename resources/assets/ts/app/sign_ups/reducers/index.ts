import {createFeatureSelector, createSelector} from "@ngrx/store";

import * as fromSignUp from "./sign_up";
import * as fromRoot from '../../reducers';

export interface SignUpsState extends fromRoot.State {
    sign_ups: fromSignUp.State;
}

export const reducers = {
    sign_ups: fromSignUp.reducer
};

export const getSignUpsState = createFeatureSelector<SignUpsState>('sign_ups');

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