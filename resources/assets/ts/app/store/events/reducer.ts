
import {Event} from "../../types/event";
import {Action} from "@ngrx/store";

import * as events from './actions';
import {LoadAllAction, LoadAllEventsSuccess} from "./actions";

export interface State extends Array<Event> {
    [index:number]: Event
}

const initialState: State = [];

export function reducer(state = initialState, action: Action): State {
    switch (action.type) {
        case events.ActionTypes.LOAD_ALL_SUCCESS:
            return (action as LoadAllEventsSuccess).payload;
        default:
            return state;
    }
}