import {Action} from "@ngrx/store";

import {Afk} from "../models/afk";

export const SELECT = "[Afk] Select";
export const UNSELECT = "[Afk] UnSelect";
export const LOAD = "[Afk] Load";
export const LOAD_FAIL = "[Afk] Load Fail";
export const LOAD_ALL = "[Afk] Load All";
export const LOAD_All_SUCCESS = "[Afk] Load All Success";
export const LOAD_All_FAIL = "[Afk] Load All Fail";

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload:number) {}
}

export class UnSelect implements Action {
    readonly type = UNSELECT;
}

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload:{afk:Afk}) {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload:any) {}
}

export class LoadAll implements Action {
    readonly type = LOAD_ALL;
}

export class LoadAllSuccess implements Action {
    readonly type = LOAD_All_SUCCESS;

    constructor(public payload:{afk:Afk[]}) {}
}

export class LoadAllFail implements Action {
    readonly type = LOAD_All_FAIL;

    constructor(public payload:any) {}
}

export type Actions =
    | Select
    | UnSelect
    | Load
    | LoadFail
    | LoadAll
    | LoadAllSuccess
    | LoadAllFail;