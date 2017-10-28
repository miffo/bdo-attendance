import {ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {storeFreeze} from "ngrx-store-freeze";
import {isDevMode} from "@angular/core";

export interface State {

}

export const reducers: ActionReducerMap<State> = {

};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    }
}

export const metaReducers: MetaReducer<State>[] = isDevMode()
    ? [logger, storeFreeze]
    : [];