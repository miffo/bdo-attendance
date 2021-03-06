import {Action} from "@ngrx/store";

import {SignUp} from "../models/sign_up";

export const SELECT = "[SignUps] Select";
export const UNSELECT = "[SignUps] UnSelect";
export const LOAD = "[SignUps] Load";
export const LOAD_FAIL = "[SignUps] Load Fail";

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload:number) {}
}

export class UnSelect implements Action {
    readonly type = UNSELECT;

    constructor() {}
}

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload:{sign_up:SignUp}) {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload:{sign_up:SignUp}) {}
}

export type Actions =
    | Select
    | UnSelect
    | Load
    | LoadFail;