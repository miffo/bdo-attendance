import {Action} from "@ngrx/store";

import {Event} from "../models/event";

export const LOAD = '[EventCollection] Load';
export const LOAD_SUCCESS = '[EventCollection] Load Success';
export const LOAD_FAIL = '[EventCollection] Load Fail';

export class Load implements Action {
    readonly type = LOAD;
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload:{events:Event[]}) {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload:any) {}
}

export type Actions =
    | Load
    | LoadSuccess
    | LoadFail;