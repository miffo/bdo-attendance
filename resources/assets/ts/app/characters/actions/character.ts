import {Action} from "@ngrx/store";

import {Character} from "../models/character";

export const SELECT = "[Character] Select";
export const UNSELECT = "[Character] UnSelect";
export const LOAD = "[Character] Load";
export const LOAD_FAIL = "[Character] Load Fail";

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload:number) {}
}

export class UnSelect implements Action {
    readonly type = UNSELECT;

    constructor(public payload:number) {}
}

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload:{character:Character}) {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload:any) {}
}

export type Actions =
    | Select
    | UnSelect
    | Load
    | LoadFail;