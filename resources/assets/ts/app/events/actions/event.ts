import {Action} from "@ngrx/store";

import {Event} from "../models/event";

export const SEARCH = "[Event] Search";
export const SEARCH_COMPLETE = "[Event] Search Complete";
export const SEARCH_ERROR = "[Event] Search Error";
export const LOAD = "[Event] Load";
export const SELECT = "[Event] Select";

export class Search implements Action {
    readonly type = SEARCH;
}

export class SearchComplete implements Action {
    readonly type = SEARCH_COMPLETE;

    constructor(public payload: Event[]) {}
}

export class SearchError implements Action {
    readonly type = SEARCH_ERROR;

    constructor(public payload: any) {}
}

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload: {event:Event}) {}
}

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload: number) {}
}

export type Actions =
    | Search
    | SearchComplete
    | SearchError
    | Load
    | Select;