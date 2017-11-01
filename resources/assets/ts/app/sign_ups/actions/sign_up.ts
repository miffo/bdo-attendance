import {Action} from "@ngrx/store";

import {SignUp} from "../models/sign_up";

export const SELECT = "[SignUps] Select";
export const LOAD = "[SignUps] Load";

export class Select implements Action {
    readonly type = SELECT;

    constructor(public payload:number) {}
}

export class Load implements Action {
    readonly type = LOAD;

    constructor(public payload:SignUp) {}
}

export type Actions =
    | Select
    | Load