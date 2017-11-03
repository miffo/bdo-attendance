import {Action} from "@ngrx/store";

import {User} from "../models/user";

export const SELECT = "[User] Select";
export const UNSELECT = "[User] UnSelect";
export const LOAD = "[User] Load";
export const LOAD_FAIL = "[User] Load Failed";
export const LOAD_ALL = "[User] Load All";
export const LOAD_ALL_SUCCESS = "[User] Load All Success";
export const LOAD_ALL_FAIL = "[User] Load All Failed";

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload:number) {}
}

export class UnSelect implements Action {
    readonly type = UNSELECT;

    constructor() {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload:any) {}
}

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload:{user:User}) {}
}

export class LoadAll implements Action {
    readonly type = LOAD_ALL;
}

export class LoadAllSuccess implements Action {
    readonly type = LOAD_ALL_SUCCESS;

    constructor(public payload:{users:User[]}) {}
}

export class LoadAllFail implements Action {
    readonly type = LOAD_ALL_FAIL;

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