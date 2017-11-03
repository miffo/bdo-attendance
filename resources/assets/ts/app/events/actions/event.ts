import {Action} from "@ngrx/store";

import {Event} from "../models/event";

export const SELECT = "[Event] Select";
export const LOAD = "[Event] Load";
export const LOAD_FAIL = "[Event] Load Fail";

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload:number) {}
}

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload:{event:Event}) {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload:any) {}
}

export type Actions =
    | Select
    | Load
    | LoadFail;
