import {Action} from "@ngrx/store";

import {CharacterClass} from "../models/character_class";

export const LOAD = "[Classes] Load";
export const LOAD_SUCCESS = "[Classes] Load Success";
export const LOAD_FAIL = "[Classes] Load Fail";

export class Load implements Action {
    readonly type = LOAD;
}

export class LoadSuccess implements Action {
    readonly type = LOAD_SUCCESS;

    constructor(public payload:{character_classes: CharacterClass[]}) {}
}

export class LoadFail implements Action {
    readonly type = LOAD_FAIL;

    constructor(public payload:any) {}
}

export type Actions =
    | Load
    | LoadSuccess
    | LoadFail;