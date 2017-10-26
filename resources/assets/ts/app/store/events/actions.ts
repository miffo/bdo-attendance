import {Action} from "@ngrx/store";
import {Event} from "../../types/event";

export const ActionTypes = {
    'LOAD_ALL': 'LOAD_ALL_EVENTS',
    'LOAD_DASHBOARD': 'LOAD_ALL_DASHBOARD_EVENTS',
    'LOAD_ALL_SUCCESS': 'LOAD_ALL_EVENTS_SUCCESS'
};

export class LoadAllAction implements Action {
    type = ActionTypes.LOAD_ALL;
    constructor() {}
}

export class LoadDashboardAction implements Action {
    type = ActionTypes.LOAD_DASHBOARD;
    constructor() {}
}

export class LoadAllEventsSuccess implements Action {
    type = ActionTypes.LOAD_ALL_SUCCESS;
    constructor(public payload:Event[]) {}
}

export type Actions
    = LoadAllAction
    | LoadDashboardAction
    | LoadAllEventsSuccess