
import {ActionReducer} from '@ngrx/store';

import {storeFreeze} from "ngrx-store-freeze";
import {combineReducers} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';

import * as fromEvents from './events';

export interface State {
    events: fromEvents.State;
}

const reducers = {
    events: fromEvents.reducer
};

//const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
    //if (process.env.NODE_ENV === 'development') return developmentReducer(state, action);
    return productionReducer(state, action);
}